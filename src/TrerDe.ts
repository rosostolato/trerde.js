import { Camera } from "./Camera";
import { Vector3 } from "./math";
import { Model3D } from "./models";
import { Scene } from "./Scene";

export class TrerDe {
  private readonly ctx: CanvasRenderingContext2D;
  private height: number;
  private width: number;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.width = canvas.width;
    this.height = canvas.height;
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      throw new Error("Couldn't get 2d context from canvas");
    }
    this.ctx = ctx;
  }

  render(scene: Scene, camera: Camera): void {
    // clear
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);

    // draw objects
    scene.objects.forEach((obj) => this.drawObject(obj, camera));

    // debug: draw camera position
    this.ctx.font = "18px Arial";
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText(`Camera position ${camera.position}`, 10, 20);
    this.ctx.fillText(`Camera rotation ${camera.rotation}`, 10, 50);
  }

  setScreenSize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
  }

  /** Draw a 3D object in view. */
  private drawObject(object: Model3D, camera: Camera): void {
    object
      .getFaces()
      .sort((f1, f2) => {
        const getCentroid = (f: typeof f1) =>
          f.vertices
            .reduce((sum, v) => sum.add(v), Vector3.zero)
            .multiply(1 / f.vertices.length);
        const c1 = getCentroid(f1);
        const c2 = getCentroid(f2);
        const dist1 = camera.position.distanceTo(c1);
        const dist2 = camera.position.distanceTo(c2);
        return dist1 > dist2 ? -1 : 1;
      })
      .forEach((face) => {
        const vertices = face.vertices
          .map((vertex) => camera.project3D(vertex, this.width, this.height))
          .filter((v) => v.z > 0);

        if (vertices.length > 2) {
          const [origin, ...points] = vertices;

          this.ctx.beginPath();
          this.ctx.moveTo(origin.x, origin.y);
          points.forEach((v) => this.ctx.lineTo(v.x, v.y));
          this.ctx.closePath();

          this.ctx.fillStyle = face.color;
          this.ctx.fill();
        }
      });
  }
}
