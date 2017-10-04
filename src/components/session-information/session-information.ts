import { Component, Input } from '@angular/core';

/**
 * Generated class for the SessionInformationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'session-information',
  templateUrl: 'session-information.html'
})
export class SessionInformationComponent {
  @Input()
  theaters: any;

  constructor() {
  }
}
