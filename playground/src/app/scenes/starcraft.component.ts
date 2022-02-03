import { HttpClient } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core'
import {
  Camera,
  InputListener,
  Prefab,
  Scene,
  TrerDe,
  Vector3,
} from '@trerdejs'
import { firstValueFrom } from 'rxjs'

@Component({
  selector: 'app-starcraft',
  template: `<canvas #canvas></canvas>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarcraftComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  readonly canvasRef!: ElementRef<HTMLCanvasElement>

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    const response = this.http.get('assets/models/bArwing_old.obj', {
      responseType: 'text',
    })
    const starcraftObj = await firstValueFrom(response)

    const scene = new Scene()
    const camera = new Camera(50)
    const inputListener = new InputListener()
    const trerde = new TrerDe(this.canvasRef.nativeElement)

    // objects
    const starcraft = new Prefab(starcraftObj)
    scene.add(starcraft)

    camera.position = new Vector3(0, 0, -11)
    setInterval(() => starcraft.rotate(0, -1, 0), 1000 / 60)

    const resizeCanvas = () =>
      trerde.setScreenSize(window.innerWidth, window.innerHeight)
    const renderLoop = () => {
      requestAnimationFrame(renderLoop)
      trerde.render(scene, camera)
    }
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    renderLoop()
  }
}
