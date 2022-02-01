import { Vector3 } from './math/vector3'
import { Object3D } from './Object3D'

let cameraindex = 0

export class Camera extends Object3D {
  constructor(private fov = 20, private min = 0.1, private max = 1000) {
    super(`Camera ${++cameraindex}`)
  }

  /** Project a 3d vertex to 2d plane. */
  project3dTo2d(
    vertex: Vector3,
    width: number,
    height: number
  ): [number, number] {
    let { x, y, z } = vertex
    const d = 50
    z = z / this.fov
    x = (x * d) / z
    y = -(y * d) / z
    return [x + width / 2, y + height / 2]
  }
}
