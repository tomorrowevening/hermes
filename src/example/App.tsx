// Libs
import { CSSProperties, useEffect, useRef } from 'react'
import { types } from '@theatre/core'
// Models
import { app, IS_DEV } from './constants'
// Components
import './App.css'
import ExampleScene from './ExampleScene';
import { debugDispatcher, ToolEvents } from '../editor/global';

const elementStyle: CSSProperties = {
  background: '#FF0000',
  width: '100px',
  height: '100px',
  position: 'absolute',
}

function App() {
  const elementRef = useRef<HTMLDivElement>(null!)
  app.theatre?.sheet('App')

  let exampleScene: ExampleScene;

  // Theatre
  useEffect(() => {
    const container = elementRef.current!
    container.style.visibility = app.editor ? 'hidden' : 'inherit'

    // Theatre Example
    const sheetObj = app.theatre?.sheetObject(
      'App',
      'Box',
      {
        x: types.number(100, {range: [0, window.innerWidth]}),
        y: types.number(100, {range: [0, window.innerHeight]}),
      },
      (values: any) => {
        container.style.left = `${values.x}px`
        container.style.top = `${values.y}px`
      },
    )
    return () => {
      if (sheetObj !== undefined) app.theatre?.unsubscribe(sheetObj)
      app.dispose()
    }
  }, [])

  // ThreeJS
  useEffect(() => {
    if (app.editor) return

    exampleScene = new ExampleScene();
    elementRef.current.parentElement!.appendChild(exampleScene.renderer.domElement)

    // Start RAF
    let raf = -1
    const onResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      exampleScene.resize(width, height)
    }
    const onUpdate = () => {
      exampleScene.draw();
      raf = requestAnimationFrame(onUpdate)
    }
    onResize()
    onUpdate()
    window.addEventListener('resize', onResize)

    // Debug
    const onGetObject = (evt: any) => {
      const child = exampleScene.scene.getObjectByProperty('uuid', evt.value);
      if (child !== undefined) app.three.setObject(child);
    };
    const onUpdateObject = (evt: any) => {
      const msg = evt.value;
      const { key, value, uuid } = msg;
      const child = exampleScene.scene.getObjectByProperty('uuid', uuid);
      if (child !== undefined) {
        const keys = key.split('.');
        const total = keys.length;
        // console.log('update obj:', uuid, keys, total, value, typeof value);
        // console.log(child);
        switch (total) {
          case 1:
            // @ts-ignore
            child[key] = value;
            break;
          case 2:
            // @ts-ignore
            child[keys[0]][keys[1]] = value;
            break;
          case 3:
            // @ts-ignore
            child[keys[0]][keys[1]][keys[2]] = value;
            break;
          case 4:
            // @ts-ignore
            child[keys[0]][keys[1]][keys[2]][keys[3]] = value;
            break;
          case 5:
            // @ts-ignore
            child[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]] = value;
            break;
        }
      }
    };
    const onGetScene = () => {
      app.three.setScene(exampleScene.scene)
    };
    if (IS_DEV) {
      debugDispatcher.addEventListener(ToolEvents.GET_OBJECT, onGetObject);
      debugDispatcher.addEventListener(ToolEvents.GET_SCENE, onGetScene);
      debugDispatcher.addEventListener(ToolEvents.UPDATE_OBJECT, onUpdateObject);
      app.three.setScene(exampleScene.scene)
    }

    return () => {
      debugDispatcher.removeEventListener(ToolEvents.GET_OBJECT, onGetObject);
      debugDispatcher.removeEventListener(ToolEvents.GET_SCENE, onGetScene);
      debugDispatcher.removeEventListener(ToolEvents.UPDATE_OBJECT, onUpdateObject);
      window.removeEventListener('resize', onResize)
      exampleScene.renderer.dispose()
      cancelAnimationFrame(raf)
      raf = -1
    }
  }, [])

  // Debug Components
  if (IS_DEV) {
    useEffect(() => {
      const container = elementRef.current!
      container.style.visibility = app.editor ? 'hidden' : 'inherit'

      // Tweakpane Example

      const testFolder = app.debug.addFolder('Test Folder')

      app.debug.button('Test Button', () => {
        console.log('Test button works!')
      }, testFolder)

      const test = { opacity: 1, rotation: 0 }
      app.debug.bind(test, 'opacity', {
        min: 0,
        max: 1,
        onChange: (value: number) => {
          container.style.opacity = value.toFixed(2)
        }
      }, testFolder)

      app.debug.bind(test, 'rotation', {
        min: 0,
        max: 360,
        onChange: (value: number) => {
          container.style.transform = `rotate(${value}deg)`
        }
      }, testFolder)

      // Components Example
      const onCustom = (evt: any) => {
        console.log('Custom:', evt.value)
      }
      const selectDropdown = (evt: any) => {
        console.log(`Dropdown: ${evt.value.dropdown}, value: ${evt.value.value}`)
      }
      debugDispatcher.addEventListener(ToolEvents.CUSTOM, onCustom)
      debugDispatcher.addEventListener(ToolEvents.SELECT_DROPDOWN, selectDropdown)
      return () => {
        debugDispatcher.removeEventListener(ToolEvents.CUSTOM, onCustom)
        debugDispatcher.removeEventListener(ToolEvents.SELECT_DROPDOWN, selectDropdown)
      }
    }, [])
  }

  return (
    <div id='box' ref={elementRef}>
      <button onClick={() => {
        app.send({
          target: 'editor',
          event: 'custom',
          data: 'hello editor!'
        })
      }}>Click</button>
    </div>
  )
}

export default App
