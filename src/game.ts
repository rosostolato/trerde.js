import { Camera, Cube, KeyListener, Vector3 } from './engine'

export class Game {
  private readonly camera = new Camera(this.canvas, this.ctx)
  private readonly keyListener = new KeyListener()
  private readonly cube = new Cube()

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly ctx: CanvasRenderingContext2D
  ) {
    this.startScene()
    this.render()
  }

  startScene(): void {
    this.camera.position = new Vector3(0, 0, 0)
    this.cube.position = new Vector3(0, 0, 10)

    setInterval(() => {
      this.cube.rotate(new Vector3(2, -2, 2))
    }, 1000 / 60)
  }

  render(): void {
    // perform actions
    this.actions()

    // clear
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // draw
    this.camera.drawGameObject(this.cube)

    // loop
    requestAnimationFrame(this.render.bind(this))
  }

  actions(): void {
    if (this.keyListener.isKeyDown('w')) {
      const forward = this.camera.forward.multiply(0.1)
      this.camera.translate(forward)
    }
    if (this.keyListener.isKeyDown('s')) {
      const backward = this.camera.forward.multiply(-0.1)
      this.camera.translate(backward)
    }
    if (this.keyListener.isKeyDown('a')) {
      const left = this.camera.forward
        .rotate(new Vector3(0, 90, 0))
        .multiply(-0.1)
      this.camera.translate(left)
    }
    if (this.keyListener.isKeyDown('d')) {
      const right = this.camera.forward
        .rotate(new Vector3(0, 90, 0))
        .multiply(0.1)
      this.camera.translate(right)
    }

    if (this.keyListener.isKeyDown('ArrowLeft')) {
      this.camera.rotate(new Vector3(0, 1, 0))
    }
    if (this.keyListener.isKeyDown('ArrowRight')) {
      this.camera.rotate(new Vector3(0, -1, 0))
    }
  }
}
