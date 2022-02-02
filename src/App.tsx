import React, { useEffect, useRef } from 'react'
import {
  Camera,
  Cube,
  KeyListener,
  Plane,
  Renderer3D,
  Scene,
  Vector3,
} from './engine'

const scene = new Scene()
const camera = new Camera(50)
const keyListener = new KeyListener()

// Shapes
const plane = new Plane()
const cube = new Cube()
scene.add(plane, cube)

camera.position = new Vector3(0, 0, -11)
plane.position = new Vector3(0, -2, 0)
plane.scale = new Vector3(10, 1, 10)

setInterval(() => {
  cube.rotate(2, -2, 2)
}, 1000 / 60)

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
    const left = camera.forward.rotate(0, 90, 0).multiply(-0.1)
    camera.translate(left)
  }
  if (keyListener.isKeyDown('d')) {
    const right = camera.forward.rotate(0, 90, 0).multiply(0.1)
    camera.translate(right)
  }

  if (keyListener.isKeyDown('ArrowUp')) {
    camera.rotate(1, 0, 0)
  }
  if (keyListener.isKeyDown('ArrowDown')) {
    camera.rotate(-1, 0, 0)
  }
  if (keyListener.isKeyDown('ArrowLeft')) {
    camera.rotate(0, 1, 0)
  }
  if (keyListener.isKeyDown('ArrowRight')) {
    camera.rotate(0, -1, 0)
  }
}

const App: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvas.current) {
      const renderer = new Renderer3D(canvas.current)
      const renderLoop = () => {
        requestAnimationFrame(renderLoop)
        actions()
        renderer.render(scene, camera)
      }
      renderLoop()

      const resizeCanvas = () => {
        if (canvas.current) {
          canvas.current.width = window.innerWidth
          canvas.current.height = window.innerHeight
          renderer.width = window.innerWidth
          renderer.height = window.innerHeight
        }
      }
      window.addEventListener('resize', resizeCanvas)
      resizeCanvas()
    }
  }, [canvas])

  return <canvas ref={canvas} width={1280} height={720}></canvas>
}

export default App
