import { Geometry3D } from './geometries'

export class Scene {
  readonly objects: Geometry3D[] = []

  add(...objects: Geometry3D[]): void {
    this.objects.push(...objects)
  }
}
