import { Face } from './face.interface'
import { GameObject } from '../game-object'
import { Vector3 } from '../vector3'

let cubeindex = 0

export class Cube extends GameObject {
  readonly faces: Face[] = [
    {
      // top (y=1)
      color: '#ff0000',
      vertices: [
        new Vector3(1, 1, -1),
        new Vector3(-1, 1, -1),
        new Vector3(-1, 1, 1),
        new Vector3(1, 1, 1),
      ],
    },
    {
      // bottom (y=-1)
      color: '#ff0000',
      vertices: [
        new Vector3(1, -1, 1),
        new Vector3(-1, -1, 1),
        new Vector3(-1, -1, -1),
        new Vector3(1, -1, -1),
      ],
    },
    {
      // front (z=1)
      color: '#ff0000',
      vertices: [
        new Vector3(1, 1, 1),
        new Vector3(-1, 1, 1),
        new Vector3(-1, -1, 1),
        new Vector3(1, -1, 1),
      ],
    },
    {
      // back (z=-1)
      color: '#ff0000',
      vertices: [
        new Vector3(1, -1, -1),
        new Vector3(-1, -1, -1),
        new Vector3(-1, 1, -1),
        new Vector3(1, 1, -1),
      ],
    },
    {
      // left (x=-1)
      color: '#ff0000',
      vertices: [
        new Vector3(-1, 1, 1),
        new Vector3(-1, 1, -1),
        new Vector3(-1, -1, -1),
        new Vector3(-1, -1, 1),
      ],
    },
    {
      // right (x=1)
      color: '#ff0000',
      vertices: [
        new Vector3(1, 1, -1),
        new Vector3(1, 1, 1),
        new Vector3(1, -1, 1),
        new Vector3(1, -1, -1),
      ],
    },
  ]
  constructor() {
    super(`Cube ${++cubeindex}`)
  }
}
