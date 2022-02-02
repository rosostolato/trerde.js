import { Face } from '../interfaces/face.interface'
import { Vector3 } from '../math/vector3'
import { Object3D } from '../Object3D'

export class Shape extends Object3D {
  protected faces: Face[] = []

  getFaces() {
    return this.faces.map(face => ({
      color: face.color,
      vertices: face.vertices.map(v =>
        new Vector3(v)
          .multiply(this.scale)
          .rotate(this.rotation)
          .add(this.position)
      ),
    }))
  }
}
