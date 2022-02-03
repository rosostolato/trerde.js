import { Model3D } from "./models";

export class Scene {
  readonly objects: Model3D[] = [];

  add(...objects: Model3D[]): void {
    this.objects.push(...objects);
  }
}
