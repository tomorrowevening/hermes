import { getGPUTier, TierResult } from 'detect-gpu';

export type QualityType = 'High' | 'Medium' | 'Low'

export type AppSettings = {
  dpr: number;
  width: number;
  height: number;
  mobile: boolean;
  supportOffScreenCanvas: boolean;
  supportWebGPU: boolean;
  quality: QualityType;
  dev: boolean;
  editor: boolean;
}

export function detectSettings(dev: boolean = false, editor: boolean = false): Promise<AppSettings> {
  return new Promise((resolve) => {
    getGPUTier().then((gpuTier: TierResult) => {
      let supportOffScreenWebGL = false;
      const canvas = document.createElement('canvas');
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      supportOffScreenWebGL = 'transferControlToOffscreen' in canvas;
  
      // If it's Safari, then check the version because Safari < 17 doesn't support OffscreenCanvas with a WebGL context.
      if (isSafari) {
        const versionMatch = navigator.userAgent.match(/version\/(\d+)/i);
        const safariVersion = versionMatch ? parseInt(versionMatch[1]) : 0;
        supportOffScreenWebGL = safariVersion >= 17;
      }
    
      const settings: AppSettings = {
        dpr: devicePixelRatio,
        width: innerWidth,
        height: innerHeight,
        mobile: gpuTier.isMobile !== undefined ? gpuTier.isMobile : false,
        supportOffScreenCanvas: supportOffScreenWebGL,
        supportWebGPU: !!navigator.gpu,
        quality: 'Low',
        dev,
        editor,
      };
      if (gpuTier.tier === 3) settings.quality = 'High';
      else if (gpuTier.tier === 2) settings.quality = 'Medium';

      resolve(settings);
    });
  });
}
