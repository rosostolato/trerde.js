import React, { useEffect, useRef } from 'react'
import {
  Camera,
  Cube,
  InputListener,
  Plane,
  Scene,
  TrerDe,
  Vector3,
} from './engine'

const scene = new Scene()
const camera = new Camera(50)
const inputListener = new InputListener()

// Geometries
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
  if (inputListener.isKeyDown('w')) {
    const forward = camera.forward.multiply(0.1)
    camera.translate(forward)
  }
  if (inputListener.isKeyDown('s')) {
    const backward = camera.forward.multiply(-0.1)
    camera.translate(backward)
  }
  if (inputListener.isKeyDown('a')) {
    const left = camera.forward.rotate(0, 90, 0).multiply(-0.1)
    camera.translate(left)
  }
  if (inputListener.isKeyDown('d')) {
    const right = camera.forward.rotate(0, 90, 0).multiply(0.1)
    camera.translate(right)
  }

  if (inputListener.isKeyDown('ArrowUp')) {
    camera.rotate(1, 0, 0)
  }
  if (inputListener.isKeyDown('ArrowDown')) {
    camera.rotate(-1, 0, 0)
  }
  if (inputListener.isKeyDown('ArrowLeft')) {
    camera.rotate(0, 1, 0)
  }
  if (inputListener.isKeyDown('ArrowRight')) {
    camera.rotate(0, -1, 0)
  }
}

const App: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvas.current) {
      const trerde = new TrerDe(canvas.current)
      const resizeCanvas = () =>
        trerde.setScreenSize(window.innerWidth, window.innerHeight)
      const renderLoop = () => {
        requestAnimationFrame(renderLoop)
        actions()
        trerde.render(scene, camera)
      }
      window.addEventListener('resize', resizeCanvas)
      resizeCanvas()
      renderLoop()
    }
  }, [canvas])

  return <canvas ref={canvas} width={1280} height={720}></canvas>
}

export default App
