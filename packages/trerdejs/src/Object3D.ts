import { d2r, Vector3 } from './math'

export abstract class Object3D {
  id: string
  position: Vector3
  rotation: Vector3
  scale: Vector3

  /**
   * Returns the forward vector based on rotation.
   * TODO: fix logic.
   */
  get forward(): Vector3 {
    // const x = d2r(this.rotation.x)
    const y = d2r(this.rotation.y)
    // const z = d2r(this.rotation.z)
    return new Vector3(-Math.sin(y), 0, Math.cos(y))
  }

  constructor(
    id: string,
    position?: Vector3,
    rotation?: Vector3,
    scale?: Vector3
  ) {
    this.id = id
    this.position = position ?? Vector3.zero
    this.rotation = rotation ?? Vector3.zero
    this.scale = scale ?? Vector3.one
  }

  translate(delta: Vector3): void {
    this.position = this.position.add(delta)
  }

  rotate(x: number, y: number, z: number): void
  rotate(euler: Vector3): void
  rotate(xOrEuler: number | Vector3, y?: number, z?: number): void {
    const euler =
      xOrEuler instanceof Vector3
        ? xOrEuler
        : new Vector3(xOrEuler, y ?? 0, z ?? 0)
    this.rotation = this.rotation.add(euler)
  }

  resize(scale: Vector3): void {
    this.scale = scale
  }

  distantTo(point: Vector3): number {
    const { x, y, z } = point.sub(this.position)
    return Math.sqrt(x ** x + y ** y + z ** z)
  }
}
