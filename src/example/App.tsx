// Libs
import { CSSProperties, useEffect, useRef } from 'react'
import { types } from '@theatre/core'
// Models
import { app } from './constants'
// Components
import './App.css'
import { debugDispatcher, ToolEvents } from '../debug/global'

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
