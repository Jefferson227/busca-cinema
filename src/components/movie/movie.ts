import { Component, Input } from '@angular/core';

/**
 * Generated class for the MovieComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'movie',
  templateUrl: 'movie.html'
})
export class MovieComponent {
  @Input()
  movie: any;

  constructor() {
  }

  ngAfterViewInit() {
  }
}
