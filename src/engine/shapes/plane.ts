import { Face } from '../interfaces/face.interface'
import { GameObject } from '../game-object'
import { Vector3 } from '../vector3'

let planeindex = 0

export class Plane extends GameObject {
  protected readonly faces: Face[] = [
    {
      color: '#4b586b',
      vertices: [
        new Vector3(-1, 0, -1),
        new Vector3(-1, 0, 1),
        new Vector3(1, 0, 1),
        new Vector3(1, 0, -1),
      ],
    },
  ]

  constructor() {
    super(`Plane ${++planeindex}`)
  }
}
