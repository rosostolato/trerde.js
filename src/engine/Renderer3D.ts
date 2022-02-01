import { Camera } from './Camera'
import { Vector3 } from './math'
import { Shape } from './objects'
import { Scene } from './Scene'

export class Renderer3D {
  readonly canvas: HTMLCanvasElement

  readonly ctx: CanvasRenderingContext2D

  constructor(width: number, height: number) {
    this.canvas = document.createElement('canvas')
    this.canvas.setAttribute('width', String(width))
    this.canvas.setAttribute('height', String(height))
    const ctx = this.canvas.getContext('2d')
    if (ctx === null) {
      throw new Error('Canvas getContext error!')
    }
    this.ctx = ctx
  }

  render(scene: Scene, camera: Camera): void {
    // clear
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // draw objects
    scene.shapeObjects.forEach(obj => this.drawObject(obj, camera))

    this.ctx.font = '18px Arial'
    this.ctx.fillStyle = '#fff'
    this.ctx.fillText(camera.position.toString(), 10, 20)
  }

  /** Draw a 3D object in view. */
  private drawObject(object: Shape, camera: Camera): void {
    const delta = object.position.sub(camera.position)

    object
      .getFaces()
      .map(face => ({
        color: face.color,
        vertices: face.vertices.map(v =>
          new Vector3(v).add(delta).rotate(camera.rotation)
        ),
        // .filter(v => v.z > 0),
      }))
      // .filter(face => face.vertices.length > 1)
      .sort((a, b) => {
        const azmax = Math.max(...a.vertices.map(v => v.z))
        const bzmax = Math.max(...b.vertices.map(v => v.z))
        return azmax > bzmax ? -1 : 1
      })
      .forEach(face => {
        const [origin, ...points] = face.vertices.map(point =>
          camera.project3dTo2d(point, this.canvas.width, this.canvas.height)
        )

        this.ctx.beginPath()
        this.ctx.moveTo(origin[0], origin[1])
        points.forEach(v => this.ctx.lineTo(v[0], v[1]))
        this.ctx.closePath()

        this.ctx.fillStyle = face.color
        this.ctx.fill()
      })
  }
}
