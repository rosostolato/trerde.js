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

    // debug: draw camera position
    this.ctx.font = '18px Arial'
    this.ctx.fillStyle = '#fff'
    this.ctx.fillText(`Camera (${camera.position})`, 10, 20)
  }

  /** Draw a 3D object in view. */
  private drawObject(object: Shape, camera: Camera): void {
    object
      .getFaces()
      .sort((f1, f2) => {
        const getCentroid = (f: typeof f1) =>
          f.vertices
            .reduce((sum, v) => sum.add(v), Vector3.zero)
            .multiply(1 / f.vertices.length)
        const c1 = getCentroid(f1)
        const c2 = getCentroid(f2)
        const dist1 = camera.position.distanceTo(c1)
        const dist2 = camera.position.distanceTo(c2)
        return dist1 > dist2 ? -1 : 1
      })
      .map(face => ({
        color: face.color,
        vertices: face.vertices
          .map(v =>
            camera.project3D(
              new Vector3(v)
                .add(object.position.sub(camera.position))
                .rotate(camera.rotation),
              this.canvas.width,
              this.canvas.height
            )
          )
          .filter(v => v.z > 0),
      }))
      .filter(face => face.vertices.length > 2)
      .forEach(face => {
        const [origin, ...points] = face.vertices

        this.ctx.beginPath()
        this.ctx.moveTo(origin.x, origin.y)
        points.forEach(v => this.ctx.lineTo(v.x, v.y))
        this.ctx.closePath()

        this.ctx.fillStyle = face.color
        this.ctx.fill()
      })
  }
}
