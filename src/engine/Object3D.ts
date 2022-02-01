import { Vector3 } from './math/vector3'

export abstract class Object3D {
  /** Object name. */
  name: string

  /** Object position. */
  position: Vector3

  /** Object rotation in euler angles. */
  rotation: Vector3

  /** Object scale. */
  scale: Vector3

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

  constructor(
    name: string,
    position?: Vector3,
    rotation?: Vector3,
    scale?: Vector3
  ) {
    this.name = name
    this.position = position ?? Vector3.zero
    this.rotation = rotation ?? Vector3.zero
    this.scale = scale ?? Vector3.one
  }

  /** Translate object. */
  translate(delta: Vector3): void {
    this.position = this.position.add(delta)
  }

  /** Rotate object. */
  rotate(delta: Vector3): void {
    this.rotation = this.rotation.add(delta)
  }

  /** Resize object. */
  resize(scale: Vector3): void {
    this.scale = scale
  }

  distantTo(point: Vector3): number {
    const { x, y, z } = point.sub(this.position)
    return Math.sqrt(x ** x + y ** y + z ** z)
  }
}
