import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { SessionInformationComponent } from './session-information/session-information';
import { Spinner_1Component } from './spinner-1/spinner-1';
import { Spinner_2Component } from './spinner-2/spinner-2';
@NgModule({
	declarations: [SessionInformationComponent,
    Spinner_1Component,
    Spinner_2Component],
	imports: [IonicModule],
	exports: [SessionInformationComponent,
    Spinner_1Component,
    Spinner_2Component]
})
export class ComponentsModule {}
