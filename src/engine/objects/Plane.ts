import { Face } from '../interfaces/face.interface'
import { Shape } from './Shape'

let planeindex = 0

export class Plane extends Shape {
  protected readonly faces: Face[] = [
    {
      color: '#4b586b',
      vertices: [
        [-1, 0, -1],
        [-1, 0, 1],
        [1, 0, 1],
        [1, 0, -1],
      ],
    },
  ]

  constructor() {
    super(`Plane ${++planeindex}`)
  }
}
