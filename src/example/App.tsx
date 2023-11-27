// Libs
import { CSSProperties, useEffect, useRef } from 'react'
import { Mesh, MeshNormalMaterial, Object3D, PerspectiveCamera, Scene, SphereGeometry, WebGLRenderer } from 'three'
import { types } from '@theatre/core'
// Models
import { app, IS_DEV } from './constants'
// Components
import './App.css'
import { debugDispatcher, ToolEvents } from '../editor/global'

const elementStyle: CSSProperties = {
  background: '#FF0000',
  width: '100px',
  height: '100px',
  position: 'absolute',
}

function App() {
  const elementRef = useRef<HTMLDivElement>(null!)
  app.theatre?.sheet('App')

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

    // Renderer

    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(devicePixelRatio)
    elementRef.current.parentElement!.appendChild(renderer.domElement)

    // Scene

    const scene = new Scene()
    scene.name = 'Example'

    // Cameras

    const cameras = new Object3D()
    cameras.name = 'cameras'
    scene.add(cameras)

    const camera = new PerspectiveCamera(60, 1, 1, 2000)
    camera.name = 'mainCamera'
    camera.position.z = 300
    cameras.add(camera)

    // World

    const world = new Object3D()
    world.name = 'world'
    scene.add(world)

    const mesh = new Mesh(new SphereGeometry(100), new MeshNormalMaterial())
    mesh.name = 'sphere'
    world.add(mesh)
    
    const test = new Object3D()
    test.name = 'test'
    mesh.add(test)

    // Start RAF
    let raf = -1
    const onResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    const onUpdate = () => {
      renderer.render(scene, camera)
      raf = requestAnimationFrame(onUpdate)
    }
    onResize()
    onUpdate()
    window.addEventListener('resize', onResize)

    // Debug
    const onGetObject = (evt: any) => {
      const child = scene.getObjectByProperty('uuid', evt.value);
      if (child !== undefined) app.three.setObject(child);
    };
    const onUpdateObject = (evt: any) => {
      console.log('onUpdateObject:', evt);
      // const child = scene.getObjectByProperty('uuid', evt.value);
      // if (child !== undefined) app.three.setObject(child);
    };
    const onGetScene = () => {
      app.three.setScene(scene)
    };
    if (IS_DEV) {
      debugDispatcher.addEventListener(ToolEvents.GET_OBJECT, onGetObject);
      debugDispatcher.addEventListener(ToolEvents.GET_SCENE, onGetScene);
      debugDispatcher.addEventListener(ToolEvents.UPDATE_OBJECT, onUpdateObject);
      app.three.setScene(scene)
    }

    return () => {
      debugDispatcher.removeEventListener(ToolEvents.GET_OBJECT, onGetObject);
      debugDispatcher.removeEventListener(ToolEvents.GET_SCENE, onGetScene);
      debugDispatcher.removeEventListener(ToolEvents.UPDATE_OBJECT, onUpdateObject);
      window.removeEventListener('resize', onResize)
      renderer.dispose()
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

      const testFolder = app.debug.addFolder('Test')

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
