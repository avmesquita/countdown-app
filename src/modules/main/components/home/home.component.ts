import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';
import { NumberSymbol } from '@angular/common';

export class ContagemRegressivaModel {
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  count_down: number;
  title: string = '';
  x: any;

  app = new ContagemRegressivaModel();

  //H.PT = 23
  dataPrimaria = new Date('06/05/2023 19:00:00');   
  //H.PT = 13
  dataSecundaria = new Date('31/01/2024 17:00:00');

  constructor(private _service: MainService) {    
    let now = new Date(Date.now()).getTime();
    let dataInicio = now;
    if (now < new Date('10/05/2023 19:00:00').getTime()) {
      dataInicio = this.dataPrimaria.getTime();
    } else {
      dataInicio = this.dataSecundaria.getTime();
    }
    this.app = new ContagemRegressivaModel();
    this.title = this._service.applicationTitle;    
    this.count_down = dataInicio;
    this.x = setInterval(() => this.countDown(), 1);

    console.log('Tem Easter Egg para o Miguel e para a Julia!');
  }

  countDown() {
    let now = new Date(Date.now()).getTime();
    let diff = this.count_down - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;    
    const day = hour * 24;

    
    this.app.days = Math.floor(diff / day);
    this.app.hours = Math.floor(diff % day / hour);
    this.app.minutes = Math.floor(diff % hour / minute);
    this.app.seconds = Math.floor(diff % minute / second);
  }


}
