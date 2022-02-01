import { Vector3 } from './math/vector3'
import { Object3D } from './Object3D'

let cameraindex = 0

export class Camera extends Object3D {
  constructor(
    public fov = 50,
    public aspect = 16 / 9,
    public near = 0.1,
    public far = 1000
  ) {
    super(`Camera ${++cameraindex}`)
  }

  /** Project a 3d vertex to 2d plane. */
  project3D(point: Vector3, width: number, height: number): Vector3 {
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
    const fov = 1 / Math.tan(d2r(this.fov / 2))
    const delta = this.far - this.near
    const clipMat = [
      [fov / this.aspect, 0, 0, 0],
      [0, fov, 0, 0],
      [
        0,
        0,
        (this.far + this.near) / delta,
        (2 * this.near * this.far) / delta,
      ],
      [0, 0, 1, 0],
    ]
    const v3Mat = [[point.x], [point.y], [point.z], [1]]
    const v2mat = matMultiply(clipMat, v3Mat)
    const [[x], [y], , [w]] = v2mat
    return new Vector3(
      (x * width) / (2 * w) + width / 2,
      -(y * height) / (2 * w) + height / 2,
      w
    )
  }
}