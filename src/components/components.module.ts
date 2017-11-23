import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { SessionInformationComponent } from './session-information/session-information';
@NgModule({
	declarations: [SessionInformationComponent],
	imports: [IonicModule],
	exports: [SessionInformationComponent]
})
export class ComponentsModule {}
