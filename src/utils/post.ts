import RemoteThree from '@/core/remote/RemoteThree';
import { GroupItemData } from '@/core/types';
import { EffectComposer, EffectPass, RenderPass, ShaderPass } from 'postprocessing';
import { ExportTexture } from './three';
import { PerspectiveCamera, RGBAFormat, ShaderMaterial, Texture, WebGLRenderer, WebGLRenderTarget } from 'three';

let addedComposerGroups: string[] = [];

export function inspectComposer(composer: EffectComposer, three: RemoteThree) {
  ExportTexture.renderer = three.renderer;

  composer.passes.forEach((pass) => {
    const groupEffects: GroupItemData[] = [];
    groupEffects.push({
      type: 'boolean',
      prop: 'Enabled',
      value: pass.enabled,
    });
    let handlePass = (prop, value) => {
      console.log('Default Handle Pass:', prop, value);
    };

    if (pass instanceof EffectPass) {
      // @ts-ignore
      pass.effects.forEach((effect, effIndex) => {
        if (effect.uniforms.size > 0) {
          effect.uniforms.forEach((uniform, key) => {
            const title = `${effect.name.replace('Effect', '')} ${key}`;
            // Textures
            if (uniform.value === null) {
              groupEffects.push({
                prop: key,
                title: title,
                type: 'image',
                value: {
                  offset: [0, 0],
                  repeat: [1, 1],
                  src: '',
                },
              });
            } else if (uniform.value.isTexture) {
              const texture = uniform.value as Texture;
              const src = ExportTexture.renderToBlob(texture);
              groupEffects.push({
                prop: key,
                title: title,
                type: 'image',
                value: {
                  offset: [texture.offset.x, texture.offset.y],
                  repeat: [texture.repeat.x, texture.repeat.y],
                  src: src,
                },
              });
            } else if (typeof uniform.value === 'number') {
              groupEffects.push({
                prop: key,
                title: title,
                type: 'number',
                value: uniform.value,
                step: 0.01,
              });
            } else if (typeof uniform.value === 'string') {
              groupEffects.push({
                prop: key,
                title: title,
                type: 'string',
                value: uniform.value,
              });
            } else if (typeof uniform.value === 'boolean') {
              groupEffects.push({
                prop: key,
                title: title,
                type: 'boolean',
                value: uniform.value,
              });
            }
          });
        }
      });

      handlePass = (prop, value) => {
        // console.log('Effect Pass:', prop, value);
        // @ts-ignore
        pass.effects.forEach((effect) => {
          if (effect.uniforms.size > 0) {
            effect.uniforms.forEach((uniform, key) => {
              if (key === prop) {
                uniform.value = value;
              }
            });
          }
        });
      };

    } else if (pass instanceof ShaderPass) {
      const mat = pass.fullscreenMaterial as ShaderMaterial;
      for (const key in mat.uniforms) {
        const uniform = mat.uniforms[key];
        const title = `${mat.name.replace('Material', '')} ${key}`;
        if (uniform.value === null) {
          groupEffects.push({
            title: title,
            prop: key,
            type: 'image',
            value: {
              offset: [0, 0],
              repeat: [1, 1],
              src: '',
            },
          });
        } else if (uniform.value.isTexture) {
          const texture = uniform.value as Texture;
          const src = ExportTexture.renderToBlob(texture);
          groupEffects.push({
            title: title,
            prop: key,
            type: 'image',
            value: {
              offset: [texture.offset.x, texture.offset.y],
              repeat: [texture.repeat.x, texture.repeat.y],
              src: src,
            },
          });
        } else if (typeof uniform.value === 'number') {
          groupEffects.push({
            title: title,
            prop: key,
            type: 'number',
            value: uniform.value,
            step: 0.01,
          });
        } else if (typeof uniform.value === 'string') {
          groupEffects.push({
            title: title,
            prop: key,
            type: 'string',
            value: uniform.value,
          });
        } else if (typeof uniform.value === 'boolean') {
          groupEffects.push({
            title: title,
            prop: key,
            type: 'boolean',
            value: uniform.value,
          });
        }
      }

      handlePass = (prop, value) => {
        const uniform = mat.uniforms[prop];
        uniform.value = value;
      };
    } else {
      return;
    }

    const groupName = `Pass: ${pass.name}`;
    three.addGroup({
      title: groupName,
      items: groupEffects,
      onUpdate: (prop, value) => {
        if (prop === 'Enabled') {
          pass.enabled = value;
        } else {
          handlePass(prop, value);
        }
      },
    });
    addedComposerGroups.push(groupName);
  });
}

export function clearComposerGroups(three: RemoteThree) {
  addedComposerGroups.forEach((value) => {
    three.removeGroup(value);
  });
  addedComposerGroups = [];
}

type FaceName = 'px' | 'nx' | 'py' | 'ny' | 'pz' | 'nz';

export function generateCubemap(
  renderer: WebGLRenderer,
  camera: PerspectiveCamera,
  composer: EffectComposer,
  size = 1024
): Promise<void> {
  return new Promise((resolve) => {
    const previousAspect = camera.aspect;
    const previousFOV = camera.fov;
    const previousRotation = camera.rotation.clone();
    const previousOutput = composer.outputBuffer;
    camera.aspect = 1;
    camera.fov = 90;
    camera.updateProjectionMatrix();
    const renderTarget = new WebGLRenderTarget(size, size, {
      format: RGBAFormat,
      depthBuffer: true,
      stencilBuffer: false,
    });
    composer.outputBuffer = renderTarget;

    // Begin
    generateCubemapFace(renderer, renderTarget, camera, 'nx', composer, size).then(() =>{
      generateCubemapFace(renderer, renderTarget, camera, 'ny', composer, size).then(() =>{
        generateCubemapFace(renderer, renderTarget, camera, 'nz', composer, size).then(() =>{
          generateCubemapFace(renderer, renderTarget, camera, 'px', composer, size).then(() =>{
            generateCubemapFace(renderer, renderTarget, camera, 'py', composer, size).then(() =>{
              generateCubemapFace(renderer, renderTarget, camera, 'pz', composer, size).then(() =>{
                camera.aspect = previousAspect;
                camera.fov = previousFOV;
                camera.rotation.copy(previousRotation);
                camera.updateMatrixWorld();
                camera.updateProjectionMatrix();
                composer.outputBuffer = previousOutput;
                renderTarget.dispose();
                resolve();
              });
            });
          });
        });
      });
    });
  });
}

function generateCubemapFace(
  renderer: WebGLRenderer,
  renderTarget: WebGLRenderTarget,
  camera: PerspectiveCamera,
  face: FaceName,
  composer: EffectComposer,
  size: number
): Promise<void> {
  return new Promise((resolve) => {
    // Rotate
    const HALF_PI = Math.PI / 2;
    switch (face) {
      case 'nx':
        camera.rotation.set(0, -HALF_PI, 0);
        break;
      case 'ny':
        camera.rotation.set(-HALF_PI, 0, Math.PI);
        break;
      case 'nz':
        camera.rotation.set(0, 0, 0);
        break;
      case 'px':
        camera.rotation.set(0, HALF_PI, 0);
        break;
      case 'py':
        camera.rotation.set(HALF_PI, 0, Math.PI);
        break;
      case 'pz':
        camera.rotation.set(0, Math.PI, 0);
        break;
    }
    
    // Render
    camera.updateMatrixWorld();
    composer.render();

    // Save to image
    const buffer = new Uint8Array(size * size * 4);
    renderer.readRenderTargetPixels(renderTarget, 0, 0, size, size, buffer);

    const raw = document.createElement('canvas');
    raw.width = raw.height = size;
    const rctx = raw.getContext('2d')!;
    const imgData = rctx.createImageData(size, size);
    imgData.data.set(buffer);
    rctx.putImageData(imgData, 0, 0);

    const flipped = document.createElement('canvas');
    flipped.width = flipped.height = size;
    const fctx = flipped.getContext('2d')!;
    fctx.translate(0, size);
    fctx.scale(1, -1);
    fctx.drawImage(raw, 0, 0);

    // Save
    const dataUrl = flipped.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${camera.name}_${face}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    resolve();
  });
}
