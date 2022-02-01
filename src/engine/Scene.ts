import { Shape } from './objects'

export class Scene {
  readonly shapeObjects: Shape[] = []

  add(...objects: Shape[]): void {
    this.shapeObjects.push(...objects)
  }
}
