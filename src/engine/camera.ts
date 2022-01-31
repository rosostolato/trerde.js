import { GameObject } from './game-object'
import { Vector3 } from './vector3'

let cameraindex = 0

export class Camera extends GameObject {
  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly ctx: CanvasRenderingContext2D
  ) {
    super(`Camera ${++cameraindex}`)
  }

  /** Draw a GameObject in the view. */
  drawGameObject(gameObject: GameObject): void {
    const delta = gameObject.position.add(this.position.multiply(-1))

    gameObject.faces.forEach(face => {
      const [origin, ...points] = face.vertices
        .map(vertex => vertex.add(delta))
        .map(vertex => vertex.rotate(this.rotation))
        .map(vertex => this.project3dTo2d(vertex))

      this.ctx.beginPath()
      this.ctx.moveTo(origin[0], origin[1])
      points.forEach(v => this.ctx.lineTo(v[0], v[1]))
      this.ctx.closePath()

      this.ctx.strokeStyle = face.color
      this.ctx.lineWidth = 1
      this.ctx.stroke()
    })
  }

  /** Project a 3d vertex to 2d plane. */
  private project3dTo2d(vertex: Vector3): [number, number] {
    let { x, y, z } = vertex
    const fov = 1 / 20
    const d = 50
    z = z * fov
    x = (x * d) / z
    y = (y * d) / z
    return [x + this.canvas.width / 2, y + this.canvas.height / 2]
  }
}
