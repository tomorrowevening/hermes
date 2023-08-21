// Libs
import { CSSProperties, useEffect, useRef } from 'react'
import { types } from '@theatre/core'
// Models
import { app } from './constants'
// Components
import './App.css'

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
    const sheetObj = app.theatre?.sheetObject(
      'App',
      'Box',
      {
        x: types.number(100, {range: [0, window.innerWidth]}),
        y: types.number(100, {range: [0, window.innerHeight]}),
      },
      (values: any) => {
        container.style.transform = `translate3d(${values.x}px, ${values.y}px, 0px)`
      },
    )
    return () => {
      if (sheetObj !== undefined) app.theatre?.unsubscribe(sheetObj)
    }
  }, [])

  return (
    <div ref={elementRef} style={elementStyle} />
  )
}

export default App
