import { Vector3Like, Vector3obj } from '../interfaces/vector3-like.interface'

export class Vector3 implements Vector3obj {
  readonly x: number
  readonly y: number
  readonly z: number

  constructor(x: number, y: number, z: number)
  constructor(vector: Vector3Like)
  constructor(xpv: number | Vector3Like, y?: number, z?: number) {
    if (Array.isArray(xpv)) {
      const [x, y, z] = xpv
      this.x = x
      this.y = y
      this.z = z
    } else if (typeof xpv === 'object') {
      this.x = xpv.x
      this.y = xpv.y
      this.z = xpv.z
    } else {
      this.x = xpv
      this.y = y!
      this.z = z!
    }
  }

  add(vector: Vector3): Vector3 {
    return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z)
  }

  sub(vector: Vector3): Vector3 {
    return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z)
  }

  multiply(module: number): Vector3
  multiply(vector: Vector3): Vector3
  multiply(morv: Vector3 | number): Vector3 {
    return morv instanceof Vector3
      ? new Vector3(this.x * morv.x, this.y * morv.y, this.z * morv.z)
      : new Vector3(this.x * morv, this.y * morv, this.z * morv)
  }

  rotate(rotation: Vector3): Vector3 {
    const matMultiply = (a: number[][], b: number[][]) => {
      const aNumRows = a.length
      const aNumCols = a[0].length
      const bNumCols = b[0].length
      const m: number[][] = new Array(aNumRows) // initialize array of rows
      for (var r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols) // initialize the current row
        for (var c = 0; c < bNumCols; ++c) {
          m[r][c] = 0 // initialize the current cell
          for (var i = 0; i < aNumCols; ++i) {
            m[r][c] += a[r][i] * b[i][c]
          }
        }
      }
      return m
    }
    const d2r = (degress: number) => degress * (Math.PI / 180)
    const rot = new Vector3(d2r(rotation.x), d2r(rotation.y), d2r(rotation.z))
    const posMat = [[this.x], [this.y], [this.z]]
    const rx = [
      [1, 0, 0],
      [0, Math.cos(rot.x), -Math.sin(rot.x)],
      [0, Math.sin(rot.x), Math.cos(rot.x)],
    ]
    const ry = [
      [Math.cos(rot.y), 0, Math.sin(rot.y)],
      [0, 1, 0],
      [-Math.sin(rot.y), 0, Math.cos(rot.y)],
    ]
    const rz = [
      [Math.cos(rot.z), -Math.sin(rot.z), 0],
      [Math.sin(rot.z), Math.cos(rot.z), 0],
      [0, 0, 1],
    ]
    let result = posMat
    result = matMultiply(rx, result)
    result = matMultiply(ry, result)
    result = matMultiply(rz, result)
    return new Vector3(result[0][0], result[1][0], result[2][0])
  }

  distanceTo(point: Vector3): number {
    const { x, y, z } = this.sub(point)
    return Math.sqrt(x * x + y * y + z * z)
  }

  toString(): string {
    const x = Math.round(this.x * 1000) / 1000
    const y = Math.round(this.y * 1000) / 1000
    const z = Math.round(this.z * 1000) / 1000
    return `x: ${x}, y: ${y}, z: ${z}`
  }

  static back = new Vector3(0, 0, -1)
  static down = new Vector3(0, -1, 0)
  static forward = new Vector3(0, 0, 1)
  static left = new Vector3(-1, 0, 0)
  static one = new Vector3(1, 1, 1)
  static right = new Vector3(1, 0, 0)
  static up = new Vector3(0, 1, 0)
  static zero = new Vector3(0, 0, 0)
}
