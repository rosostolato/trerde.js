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

const renderer = new Renderer3D(1280, 720)
const scene = new Scene()
const camera = new Camera()
const keyListener = new KeyListener()

// Shapes
const cube = new Cube()
const plane = new Plane()
scene.add(plane, cube)

camera.position = new Vector3(0, 0, -11)
plane.position = new Vector3(0, -2, 0)
plane.scale = new Vector3(10, 1, 10)

setInterval(() => {
  cube.rotate(new Vector3(2, 2, 2))
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
    const left = camera.forward.rotate(new Vector3(0, 90, 0)).multiply(-0.1)
    camera.translate(left)
  }
  if (keyListener.isKeyDown('d')) {
    const right = camera.forward.rotate(new Vector3(0, 90, 0)).multiply(0.1)
    camera.translate(right)
  }

  if (keyListener.isKeyDown('ArrowLeft')) {
    camera.rotate(new Vector3(0, 1, 0))
  }
  if (keyListener.isKeyDown('ArrowRight')) {
    camera.rotate(new Vector3(0, -1, 0))
  }
}

const render = () => {
  // perform actions
  actions()

  // render
  renderer.render(scene, camera)

  // loop
  requestAnimationFrame(render)
}

const App: React.FC = () => {
  const canvas = useRef<HTMLDivElement>(null)

  useEffect(() => {
    render()

    if (canvas.current) {
      canvas.current.innerHTML = ''
      canvas.current.append(renderer.canvas)
    }
  }, [canvas])

  return <div id="canvas" ref={canvas}></div>
}

export default App
