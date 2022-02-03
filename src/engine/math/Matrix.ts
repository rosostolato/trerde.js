export class Matrix {
  private readonly matrix: number[][]
  readonly rows: number
  readonly cols: number
  readonly isSquare: boolean

  constructor(...rows: number[][]) {
    this.matrix = rows
    this.rows = rows.length
    this.cols = rows[0].length
    this.isSquare = this.rows === this.cols

    // check if is continuos
    rows.reduce((len, row) => {
      if (len !== row.length) {
        throw new Error('Every row of matrix needs to have the same length')
      }
      return row.length
    }, rows[0].length)
  }

  multiply(mat: Matrix): Matrix {
    const matA = this.toArray()
    const matB = mat.toArray()
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
    return new Matrix(...m)
  }

  toArray(): number[][] {
    return this.matrix.slice()
  }

  static identity(order: number): Matrix {
    const rows = []
    for (let i = 0; i < order; i++) {
      const cols = []
      for (let j = 0; j < order; j++) {
        cols.push(i === j ? 1 : 0)
      }
      rows.push(cols)
    }
    return new Matrix(...rows)
  }
}
