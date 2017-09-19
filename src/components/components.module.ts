import { NgModule } from '@angular/core';
import { MovieComponent } from './movie/movie';
import { IonicModule } from "ionic-angular";
@NgModule({
	declarations: [MovieComponent],
	imports: [IonicModule],
	exports: [MovieComponent]
})
export class ComponentsModule {}
