import { Vector3Like, Vector3obj } from '../interfaces/vector3-like.interface'

export type EulerOrder = 'XYZ' | 'XZY' | 'YZX' | 'YXZ' | 'ZXY' | 'ZYX'

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
      this.y = y ?? 0
      this.z = z ?? 0
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

  rotate(x: number, y: number, z: number, order?: EulerOrder): Vector3
  rotate(euler: Vector3, order?: EulerOrder): Vector3
  rotate(
    xOrEuler: number | Vector3,
    yOrOrder?: number | string,
    z?: number,
    order?: EulerOrder
  ): Vector3 {
    const d2r = (degress: number | string) => Number(degress) * (Math.PI / 180)
    const euler =
      xOrEuler instanceof Vector3
        ? new Vector3(d2r(xOrEuler.x), d2r(xOrEuler.y), d2r(xOrEuler.z))
        : new Vector3(d2r(xOrEuler), d2r(yOrOrder ?? 0), d2r(z ?? 0))
    order = xOrEuler instanceof Vector3 ? (yOrOrder as EulerOrder) : order
    order ??= 'XYZ'

    const pipe =
      (...funcs: Function[]) =>
      <T>(value: T) =>
        funcs.reduce((acc, func) => func(acc), value)
    const rotators = order.split('').map(axis => {
      return (v: Vector3) => this.matrixRotate(v, euler, axis as any)
    })
    return pipe(...rotators)(this)
  }

  distanceTo(point: Vector3): number {
    const { x, y, z } = this.sub(point)
    return Math.sqrt(x * x + y * y + z * z)
  }

  toMatrix3(): [[x: number], [y: number], [z: number]] {
    return [[this.x], [this.y], [this.z]]
  }

  toMatrix4(w = 1): [[x: number], [y: number], [z: number], [w: number]] {
    return [[this.x], [this.y], [this.z], [w]]
  }

  toString(): string {
    const x = Math.round(this.x * 1000) / 1000
    const y = Math.round(this.y * 1000) / 1000
    const z = Math.round(this.z * 1000) / 1000
    return `{x: ${x}, y: ${y}, z: ${z}}`
  }

  private matrixRotate(vector: Vector3, euler: Vector3, axis: 'X' | 'Y' | 'Z') {
    const rx = [
      [1, 0, 0],
      [0, Math.cos(euler.x), -Math.sin(euler.x)],
      [0, Math.sin(euler.x), Math.cos(euler.x)],
    ]
    const ry = [
      [Math.cos(euler.y), 0, Math.sin(euler.y)],
      [0, 1, 0],
      [-Math.sin(euler.y), 0, Math.cos(euler.y)],
    ]
    const rz = [
      [Math.cos(euler.z), -Math.sin(euler.z), 0],
      [Math.sin(euler.z), Math.cos(euler.z), 0],
      [0, 0, 1],
    ]
    const matrices = { X: rx, Y: ry, Z: rz }
    const mat = this.matrixMultiply(matrices[axis], vector.toMatrix3())
    return new Vector3(mat[0][0], mat[1][0], mat[2][0])
  }

  private matrixMultiply(matA: number[][], matB: number[][]) {
    const aNumRows = matA.length
    const aNumCols = matA[0].length
    const bNumCols = matB[0].length
    const m: number[][] = new Array(aNumRows) // initialize array of rows
    for (var r = 0; r < aNumRows; ++r) {
      m[r] = new Array(bNumCols) // initialize the current row
      for (var c = 0; c < bNumCols; ++c) {
        m[r][c] = 0 // initialize the current cell
        for (var i = 0; i < aNumCols; ++i) {
          m[r][c] += matA[r][i] * matB[i][c]
        }
      }
    }
    return m
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
