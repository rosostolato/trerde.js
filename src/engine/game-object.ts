import { Face } from './shapes/face.interface'
import { Vector3 } from './vector3'

export abstract class GameObject {
  faces: Face[] = []

  /** Game object name. */
  name: string

  /** Game object position. */
  position: Vector3

  /** Game object rotation in euler angles. */
  rotation: Vector3

  /**
   * Returns the forward vector based on rotation.
   * TODO: fix logic.
   */
  get forward(): Vector3 {
    const d2r = (degress: number) => degress * (Math.PI / 180)
    const rot = new Vector3(
      d2r(this.rotation.x),
      d2r(this.rotation.y),
      d2r(this.rotation.z)
    )
    return new Vector3(-Math.sin(rot.y), 0, Math.cos(rot.y))
  }

  constructor(name: string, position?: Vector3, rotation?: Vector3) {
    this.name = name
    this.position = position ?? Vector3.zero
    this.rotation = rotation ?? Vector3.zero
  }

  /** Translate game object. */
  translate(delta: Vector3): void {
    this.position = this.position.add(delta)
  }

  rotate(delta: Vector3): void {
    this.rotation = this.rotation.add(delta)
  }
}
