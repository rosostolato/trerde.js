import { Camera, Cube, KeyListener, Vector3 } from './engine'
import React, { useEffect, useRef } from 'react'

const keyListener = new KeyListener()

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (canvas && ctx) {
      const camera = new Camera(canvas, ctx)
      const cube = new Cube()

      const actions = () => {
        if (keyListener.isKeyDown('w')) {
          const forward = camera.forward.multiply(0.1)
          camera.translate(forward)
        }
        if (keyListener.isKeyDown('s')) {
          const backward = camera.forward.multiply(-0.1)
          camera.translate(backward)
        }
        if (keyListener.isKeyDown('a')) {
          const left = camera.forward
            .rotate(new Vector3(0, 90, 0))
            .multiply(-0.1)
          camera.translate(left)
        }
        if (keyListener.isKeyDown('d')) {
          const right = camera.forward
            .rotate(new Vector3(0, 90, 0))
            .multiply(0.1)
          camera.translate(right)
        }

        if (keyListener.isKeyDown('ArrowLeft')) {
          camera.rotate(new Vector3(0, 1, 0))
        }
        if (keyListener.isKeyDown('ArrowRight')) {
          camera.rotate(new Vector3(0, -1, 0))
        }
      }

      const startScene = () => {
        camera.position = new Vector3(0, 0, 0)
        cube.position = new Vector3(0, 0, 10)
      }

      const render = () => {
        // perform actions
        actions()

        // clear
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // draw
        camera.drawGameObject(cube)

        // loop
        requestAnimationFrame(render)
      }

      startScene()
      render()
    }
  })

  return <canvas id="canvas" width="1280" height="720" ref={canvasRef}></canvas>
}

export default App
