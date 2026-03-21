// Runs inside the Web Worker — encoded as a Blob URL so no build tooling is needed
const WORKER_SOURCE = /* js */ `
self.onmessage = async ({ data }) => {
  if (data.type !== 'encode') return;
  const { bitmap, index, format, quality } = data;
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const mime = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
  const blob = await canvas.convertToBlob({ type: mime, quality });
  self.postMessage({ type: 'encoded', index, blob });
};
`;

export interface ImageSequenceCapturerOptions {
  /** Image format. Defaults to 'png'. */
  format?: 'png' | 'jpeg' | 'webp';
  /** Encode quality 0–1 for jpeg/webp. Defaults to 0.92. */
  quality?: number;
  /** File name prefix. Defaults to 'frame'. */
  prefix?: string;
  /** Zero-padding digit count. Defaults to 5 (frame_00001.png). */
  padLength?: number;
  /**
   * Max frames in-flight to the worker at once (backpressure).
   * Tune down if you're hitting memory pressure. Defaults to 32.
   */
  maxQueue?: number;
  /** Target capture frame rate. Frames arriving faster than this are dropped. Defaults to 30. */
  fps?: number;
  /** Called each time a frame finishes encoding. */
  onProgress?: (captured: number, encoded: number) => void;
  onError?: (err: Error) => void;
}

export class ImageSequenceCapturer {
  private readonly worker: Worker;
  private readonly source: HTMLCanvasElement;
  /** Intermediate 2D canvas used for GPU→CPU readback. Works with WebGPU and WebGL. */
  private readonly transfer: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly opts: Required<ImageSequenceCapturerOptions>;

  private _capturing = false;
  private _captured = 0;
  private _encoded = 0;
  private _pending = 0;
  private _lastFrameTime = -Infinity;
  private frames = new Map<number, Blob>();

  constructor(canvas: HTMLCanvasElement, options: ImageSequenceCapturerOptions = {}) {
    this.source = canvas;

    this.transfer = document.createElement('canvas');
    this.transfer.width = canvas.width;
    this.transfer.height = canvas.height;
    this.ctx = this.transfer.getContext('2d', { willReadFrequently: true })!;

    this.opts = {
      format: options.format ?? 'png',
      quality: options.quality ?? 0.92,
      prefix: options.prefix ?? 'frame',
      padLength: options.padLength ?? 5,
      maxQueue: options.maxQueue ?? 32,
      fps: options.fps ?? 30,
      onProgress: options.onProgress ?? (() => {}),
      onError: options.onError ?? ((e) => console.error('[ImageSequenceCapturer]', e)),
    };

    const workerBlob = new Blob([WORKER_SOURCE], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(workerBlob);
    this.worker = new Worker(workerUrl);
    URL.revokeObjectURL(workerUrl);

    this.worker.onmessage = ({ data }) => {
      if (data.type !== 'encoded') return;
      this.frames.set(data.index, data.blob);
      this._pending--;
      this._encoded++;
      this.opts.onProgress(this._captured, this._encoded);
    };

    this.worker.onerror = (e) => this.opts.onError(new Error(e.message));
  }

  get isCapturing() { return this._capturing; }
  get framesCaptured() { return this._captured; }
  get framesEncoded() { return this._encoded; }
  /** True when no frames are waiting to finish encoding. */
  get isIdle() { return this._pending === 0; }

  /**
   * Resize the transfer canvas to match the source.
   * Call this if the canvas dimensions change between sessions.
   */
  resize(): void {
    this.transfer.width = this.source.width;
    this.transfer.height = this.source.height;
  }

  /** Begin a new capture session. Clears any previously captured frames. */
  start(): void {
    this._capturing = true;
    this._captured = 0;
    this._encoded = 0;
    this._pending = 0;
    this._lastFrameTime = -Infinity;
    this.frames.clear();
  }

  stop(): void {
    this._capturing = false;
  }

  /**
   * Capture the current canvas frame and queue it for encoding.
   *
   * **Call this immediately after your render call**, before the next frame begins.
   * This is especially important for WebGPU, where the swap chain texture is
   * only valid until the next `queue.submit()`.
   *
   * Returns `false` if not capturing or the worker queue is full (backpressure).
   */
  captureFrame(): boolean {
    if (!this._capturing) return false;
    if (this._pending >= this.opts.maxQueue) return false;

    const now = performance.now();
    if (now - this._lastFrameTime < 1000 / this.opts.fps) return false;
    this._lastFrameTime = now;

    // drawImage copies the current GPU texture into the 2D canvas synchronously.
    // This is the only reliable readback path for both WebGPU and WebGL canvases.
    this.ctx.drawImage(this.source, 0, 0);

    const index = this._captured++;
    this._pending++;

    createImageBitmap(this.transfer)
      .then((bitmap) => {
        this.worker.postMessage(
          { type: 'encode', bitmap, index, format: this.opts.format, quality: this.opts.quality },
          [bitmap], // transfer ownership — zero-copy
        );
      })
      .catch((err) => {
        this._pending--;
        this.opts.onError(err as Error);
      });

    return true;
  }

  /** Resolves once all in-flight frames have finished encoding. */
  flush(): Promise<void> {
    return new Promise((resolve) => {
      const poll = () => (this._pending === 0 ? resolve() : setTimeout(poll, 16));
      poll();
    });
  }

  /**
   * Download all captured frames after waiting for encoding to finish.
   *
   * Prefers the **File System Access API** (`showDirectoryPicker`) so all frames
   * are written directly into a folder the user selects — no zip library needed.
   * Falls back to sequential `<a download>` clicks in browsers that don't support it.
   */
  async download(): Promise<void> {
    await this.flush();

    const ext = this.opts.format === 'jpeg' ? 'jpg' : this.opts.format;
    const sorted = [...this.frames.entries()].sort(([a], [b]) => a - b);
    const named = sorted.map(([i, blob]) => ({
      name: `${this.opts.prefix}_${String(i).padStart(this.opts.padLength, '0')}.${ext}`,
      blob,
    }));

    if ('showDirectoryPicker' in window) {
      try {
        const dir = await (window as any).showDirectoryPicker({ mode: 'readwrite', startIn: 'downloads' });
        await Promise.all(
          named.map(async ({ name, blob }) => {
            const fh = await dir.getFileHandle(name, { create: true });
            const writable = await fh.createWritable();
            await writable.write(blob);
            await writable.close();
          }),
        );
        return;
      } catch (e) {
        if ((e as DOMException).name === 'AbortError') return;
        // fall through to anchor fallback
      }
    }

    // Fallback: trigger downloads one by one with a small delay to avoid throttling
    for (const { name, blob } of named) {
      const url = URL.createObjectURL(blob);
      const a = Object.assign(document.createElement('a'), { href: url, download: name });
      a.click();
      URL.revokeObjectURL(url);
      await new Promise<void>((r) => setTimeout(r, 50));
    }
  }

  /** Clear all stored frames without downloading. */
  reset(): void {
    this._capturing = false;
    this._captured = 0;
    this._encoded = 0;
    this._pending = 0;
    this.frames.clear();
  }

  /** Terminate the worker and release all resources. */
  destroy(): void {
    this.reset();
    this.worker.terminate();
  }
}
