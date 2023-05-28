import { Component, enableProdMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  
  constructor() {
    enableProdMode();
  }
}
