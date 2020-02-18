//import { slideInAnimation } from './route-animation';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'SavanaPoint',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // animations: [
  //   slideInAnimation

  //   ]
})
export class AppComponent {
  title = 'Nabolada';
  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  // }
}
