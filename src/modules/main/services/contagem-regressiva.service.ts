import { Injectable, OnDestroy } from '@angular/core';
import { ContagemRegressivaModel } from '../models/contagem-regressiva.model';

@Injectable({
  providedIn: 'root'
})
export class ContagemRegressivaService implements OnDestroy {
  private count_down: number;
  private timer: NodeJS.Timer;

  public app = new ContagemRegressivaModel();

  //H.PT = 23
  private dataPrimaria = new Date('06/05/2023 19:00:00');   
  //H.PT = 13
  private dataSecundaria = new Date('31/01/2024 17:00:00');

  private fromDate: Date = this.dataPrimaria;

  constructor(private window: Window) {
    let now = new Date(Date.now()).getTime();    
    const evt = {
      event_category: 'query_date',
      event_label: 'setQueryDate',
      value: new Date(Date.now()).toDateString()
    };
    (<any>this.window).gtag('event', 'query_date', evt);

    if (now < this.dataPrimaria.getTime()) {
      this.fromDate = this.dataPrimaria;
    } else {
      this.fromDate = this.dataSecundaria;
    }
    this.app = new ContagemRegressivaModel();
    
    this.count_down = this.fromDate ? this.fromDate.getTime() : 0;
    this.timer = setInterval(() => this.countDown(), 1);

    console.log('Tem Easter Egg para o Miguel e para a Julia!');
  }

  ngOnDestroy(): void {
    this.timer.unref();
  }

  public setFromDate(date: Date): void {
    this.fromDate = date;
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
