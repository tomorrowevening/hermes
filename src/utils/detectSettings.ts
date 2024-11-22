import { getGPUTier, TierResult } from 'detect-gpu';

export enum QualityType {
  'High',
  'Medium',
  'Low',
}

export type AppSettings = {
  dpr: number;
  fps: number;
  width: number;
  height: number;
  mobile: boolean;
  supportOffScreenCanvas: boolean;
  quality: QualityType;
}

export function detectSettings(canvas: HTMLCanvasElement): Promise<AppSettings> {
  return new Promise((resolve) => {
    // Detect settings
    getGPUTier().then((gpuTier: TierResult) => {
      // Detect Support
      let supportOffScreenWebGL = false;
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      supportOffScreenWebGL = 'transferControlToOffscreen' in canvas;
  
      // If it's Safari, then check the version because Safari < 17 doesn't support OffscreenCanvas with a WebGL context.
      if (isSafari) {
        const versionMatch = navigator.userAgent.match( /version\/(\d+)/i );
        const safariVersion = versionMatch ? parseInt( versionMatch[ 1 ] ) : 0;
        supportOffScreenWebGL = safariVersion >= 17;
      }
    
      // Update Settings
      const settings: AppSettings = {
        dpr: devicePixelRatio,
        fps: gpuTier.fps !== undefined ? gpuTier.fps : 30,
        width: innerWidth,
        height: innerHeight,
        mobile: gpuTier.isMobile !== undefined ? gpuTier.isMobile : false,
        supportOffScreenCanvas: supportOffScreenWebGL,
        quality: QualityType.Low,
      };
      if (gpuTier.tier === 3) settings.quality = QualityType.High;
      else if (gpuTier.tier === 2) settings.quality = QualityType.Medium;

      resolve(settings);
    });
  });
}
