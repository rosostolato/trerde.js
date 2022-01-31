import React, { useEffect, useRef } from 'react'

import { Game } from './game'

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      new Game(canvas, ctx)
    }
  })

  return <canvas id="canvas" width="1280" height="720" ref={canvasRef}></canvas>
}

export default App
