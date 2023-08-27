// Libs
import { CSSProperties, useEffect, useRef } from 'react'
import { types } from '@theatre/core'
import { Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, SphereGeometry, WebGLRenderer } from 'three'
// Models
import { app } from './constants'
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

  useEffect(() => {
    const container = elementRef.current!
    container.style.visibility = app.editor ? 'hidden' : 'inherit'

    // GUI Example
    const testFolder = app.debug?.addFolder('Test')

    app.debug?.button('Test Button', () => {
      console.log('Test button works!')
    }, testFolder)

    const test = { opacity: 1, rotation: 0 }
    app.debug?.bind(test, 'opacity', {
      min: 0,
      max: 1,
      onChange: (value: number) => {
        container.style.opacity = value.toFixed(2)
      }
    }, testFolder)

    app.debug?.bind(test, 'rotation', {
      min: 0,
      max: 360,
      onChange: (value: number) => {
        container.style.transform = `rotate(${value}deg)`
      }
    }, testFolder)

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

    const width = window.innerWidth
    const height = window.innerHeight
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(devicePixelRatio)
    elementRef.current.parentElement!.appendChild(renderer.domElement)

    const scene = new Scene()
    scene.name = 'Example'

    const camera = new PerspectiveCamera(60, width / height, 1, 2000)
    camera.position.z = 300

    const mesh = new Mesh(new SphereGeometry(100), new MeshNormalMaterial())
    mesh.name = 'sphere'
    scene.add(mesh)

    const onSelect = (evt: any) => {
      console.log('onSelect:', evt.value)
    }
    debugDispatcher.addEventListener(ToolEvents.INSPECT_ITEM, onSelect)

    // Start RAF
    let raf = -1
    const onUpdate = () => {
      renderer.render(scene, camera)
      raf = requestAnimationFrame(onUpdate)
    }
    onUpdate()

    return () => {
      renderer.dispose()
      cancelAnimationFrame(raf)
      raf = -1
    }
  }, [])

  // Debug Events
  useEffect(() => {
    const selectDropdown = (evt: any) => {
      console.log(`Dropdown: ${evt.value.dropdown}, value: ${evt.value.value}`)
    }
    const draglistUpdate = (evt: any) => {
      console.log(`Dragged list updated: ${evt.value.dropdown}, value: ${evt.value.value.join(', ')}`)
    }
    debugDispatcher.addEventListener(ToolEvents.SELECT_DROPDOWN, selectDropdown)
    debugDispatcher.addEventListener(ToolEvents.DRAG_UPDATE, draglistUpdate)
    return () => {
      debugDispatcher.removeEventListener(ToolEvents.SELECT_DROPDOWN, selectDropdown)
      debugDispatcher.removeEventListener(ToolEvents.DRAG_UPDATE, draglistUpdate)
    }
  }, [])

  return (
    <div id='box' ref={elementRef} />
  )
}

export default App
