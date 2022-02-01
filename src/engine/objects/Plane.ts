import { Vector3Like } from '../interfaces/vector3-like.interface'
import { Shape } from './Shape'

let planeindex = 0

export class Plane extends Shape {
  constructor(xcount = 10, ycount = 10) {
    super(`Plane ${++planeindex}`)

    for (let x = 0; x < xcount; x++) {
      for (let y = 0; y < ycount; y++) {
        const xstart = (x * 2) / xcount - 1
        const ystart = (y * 2) / ycount - 1
        const vertices: Vector3Like[] = [
          [xstart, 0, ystart],
          [xstart, 0, ystart + 2 / ycount],
          [xstart + 2 / xcount, 0, ystart + 2 / ycount],
          [xstart + 2 / xcount, 0, ystart],
        ]
        this.faces.push({
          color: '#4b586b',
          vertices,
        })
      }
    }
  }
}
