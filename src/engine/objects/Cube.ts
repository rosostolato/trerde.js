import { Face } from '../interfaces/face.interface'
import { Shape } from './Shape'

let cubeindex = 0

export class Cube extends Shape {
  protected readonly faces: Face[] = [
    {
      // top (y=1)
      color: '#0000ff',
      vertices: [
        [1, 1, -1],
        [-1, 1, -1],
        [-1, 1, 1],
        [1, 1, 1],
      ],
    },
    {
      // bottom (y=-1)
      color: '#0000ff',
      vertices: [
        [1, -1, 1],
        [-1, -1, 1],
        [-1, -1, -1],
        [1, -1, -1],
      ],
    },
    {
      // front (z=1)
      color: '#ff0000',
      vertices: [
        [1, 1, 1],
        [-1, 1, 1],
        [-1, -1, 1],
        [1, -1, 1],
      ],
    },
    {
      // back (z=-1)
      color: '#ff0000',
      vertices: [
        [1, -1, -1],
        [-1, -1, -1],
        [-1, 1, -1],
        [1, 1, -1],
      ],
    },
    {
      // left (x=-1)
      color: '#00ff00',
      vertices: [
        [-1, 1, 1],
        [-1, 1, -1],
        [-1, -1, -1],
        [-1, -1, 1],
      ],
    },
    {
      // right (x=1)
      color: '#00ff00',
      vertices: [
        [1, 1, -1],
        [1, 1, 1],
        [1, -1, 1],
        [1, -1, -1],
      ],
    },
  ]
  constructor() {
    super(`cube-${String(++cubeindex).padStart(2, '0')}`)
  }
}
