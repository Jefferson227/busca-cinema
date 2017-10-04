import { NgModule } from '@angular/core';
import { MovieComponent } from './movie/movie';
import { IonicModule } from "ionic-angular";
import { SessionInformationComponent } from './session-information/session-information';
@NgModule({
	declarations: [MovieComponent,
    SessionInformationComponent],
	imports: [IonicModule],
	exports: [MovieComponent,
    SessionInformationComponent]
})
export class ComponentsModule {}
