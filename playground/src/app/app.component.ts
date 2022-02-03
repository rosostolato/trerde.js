import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `<app-starcraft></app-starcraft>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
