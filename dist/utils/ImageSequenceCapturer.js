const c = (
  /* js */
  `
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
`
);
class d {
  worker;
  source;
  /** Intermediate 2D canvas used for GPU→CPU readback. Works with WebGPU and WebGL. */
  transfer;
  ctx;
  opts;
  _capturing = !1;
  _captured = 0;
  _encoded = 0;
  _pending = 0;
  _lastFrameTime = -1 / 0;
  frames = /* @__PURE__ */ new Map();
  constructor(s, t = {}) {
    this.source = s, this.transfer = document.createElement("canvas"), this.transfer.width = s.width, this.transfer.height = s.height, this.ctx = this.transfer.getContext("2d", { willReadFrequently: !0 }), this.opts = {
      format: t.format ?? "png",
      quality: t.quality ?? 0.92,
      prefix: t.prefix ?? "frame",
      padLength: t.padLength ?? 5,
      maxQueue: t.maxQueue ?? 32,
      fps: t.fps ?? 30,
      onProgress: t.onProgress ?? (() => {
      }),
      onError: t.onError ?? ((e) => console.error("[ImageSequenceCapturer]", e))
    };
    const a = new Blob([c], { type: "application/javascript" }), r = URL.createObjectURL(a);
    this.worker = new Worker(r), URL.revokeObjectURL(r), this.worker.onmessage = ({ data: e }) => {
      e.type === "encoded" && (this.frames.set(e.index, e.blob), this._pending--, this._encoded++, this.opts.onProgress(this._captured, this._encoded));
    }, this.worker.onerror = (e) => this.opts.onError(new Error(e.message));
  }
  get isCapturing() {
    return this._capturing;
  }
  get framesCaptured() {
    return this._captured;
  }
  get framesEncoded() {
    return this._encoded;
  }
  /** True when no frames are waiting to finish encoding. */
  get isIdle() {
    return this._pending === 0;
  }
  /**
   * Resize the transfer canvas to match the source.
   * Call this if the canvas dimensions change between sessions.
   */
  resize() {
    this.transfer.width = this.source.width, this.transfer.height = this.source.height;
  }
  /** Begin a new capture session. Clears any previously captured frames. */
  start() {
    this._capturing = !0, this._captured = 0, this._encoded = 0, this._pending = 0, this._lastFrameTime = -1 / 0, this.frames.clear();
  }
  stop() {
    this._capturing = !1;
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
  captureFrame() {
    if (!this._capturing || this._pending >= this.opts.maxQueue) return !1;
    const s = performance.now();
    if (s - this._lastFrameTime < 1e3 / this.opts.fps) return !1;
    this._lastFrameTime = s, this.ctx.drawImage(this.source, 0, 0);
    const t = this._captured++;
    return this._pending++, createImageBitmap(this.transfer).then((a) => {
      this.worker.postMessage(
        { type: "encode", bitmap: a, index: t, format: this.opts.format, quality: this.opts.quality },
        [a]
        // transfer ownership — zero-copy
      );
    }).catch((a) => {
      this._pending--, this.opts.onError(a);
    }), !0;
  }
  /** Resolves once all in-flight frames have finished encoding. */
  flush() {
    return new Promise((s) => {
      const t = () => this._pending === 0 ? s() : setTimeout(t, 16);
      t();
    });
  }
  /**
   * Download all captured frames after waiting for encoding to finish.
   *
   * Prefers the **File System Access API** (`showDirectoryPicker`) so all frames
   * are written directly into a folder the user selects — no zip library needed.
   * Falls back to sequential `<a download>` clicks in browsers that don't support it.
   */
  async download() {
    await this.flush();
    const s = this.opts.format === "jpeg" ? "jpg" : this.opts.format, a = [...this.frames.entries()].sort(([r], [e]) => r - e).map(([r, e]) => ({
      name: `${this.opts.prefix}_${String(r).padStart(this.opts.padLength, "0")}.${s}`,
      blob: e
    }));
    if ("showDirectoryPicker" in window)
      try {
        const r = await window.showDirectoryPicker({ mode: "readwrite", startIn: "downloads" });
        await Promise.all(
          a.map(async ({ name: e, blob: i }) => {
            const n = await (await r.getFileHandle(e, { create: !0 })).createWritable();
            await n.write(i), await n.close();
          })
        );
        return;
      } catch (r) {
        if (r.name === "AbortError") return;
      }
    for (const { name: r, blob: e } of a) {
      const i = URL.createObjectURL(e);
      Object.assign(document.createElement("a"), { href: i, download: r }).click(), URL.revokeObjectURL(i), await new Promise((n) => setTimeout(n, 50));
    }
  }
  /** Clear all stored frames without downloading. */
  reset() {
    this._capturing = !1, this._captured = 0, this._encoded = 0, this._pending = 0, this.frames.clear();
  }
  /** Terminate the worker and release all resources. */
  destroy() {
    this.reset(), this.worker.terminate();
  }
}
export {
  d as ImageSequenceCapturer
};
