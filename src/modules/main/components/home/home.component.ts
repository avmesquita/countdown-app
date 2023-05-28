import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  title: string = '';
  constructor(private _service: MainService) {
    this.title = this._service.applicationTitle;
  }

}
