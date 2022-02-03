import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { RotatingCubeComponent } from './scenes/rotating-cube.component'
import { StarcraftComponent } from './scenes/starcraft.component'

@NgModule({
  declarations: [AppComponent, RotatingCubeComponent, StarcraftComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
