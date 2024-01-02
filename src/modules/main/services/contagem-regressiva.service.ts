import { Injectable, OnDestroy } from '@angular/core';
import { ContagemRegressivaModel } from '../models/contagem-regressiva.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContagemRegressivaService implements OnDestroy {

  private count_down: number = 0;
  private timer?: NodeJS.Timer;

  public app = new ContagemRegressivaModel();

  private fromDate = new Date;
  private dates: any;

  private isLoaded: boolean = false;

  constructor(protected http: HttpClient,
              private window: Window) {
    this.load();
  }

  private load(): void {
    this.getDataset().subscribe( (response: any) => {      
      this.dates = response.sort( (a: any, b: any) => {
        return Number(a.data) - Number(b.data);
      });
      this.dates.forEach( (element: any) => {
        debugger;
        const _fromDate = Number(this.fromDate);
        const _elementData = Number(new Date(element.data));
        const _dateNumber = Number(new Date());
        if ( !this.isLoaded && (_fromDate < _elementData) && ( _elementData >=  _dateNumber) )  {
          this.fromDate = new Date(element.data);
          console.log("SELETED => ", this.fromDate);

          this.app = new ContagemRegressivaModel();
      
          this.count_down = this.fromDate ? this.fromDate.getTime() : 0;
          this.timer = setInterval(() => this.countDown(), 1);
          this.isLoaded = true;                    
        }
      });
    });    
  }

  ngOnDestroy(): void {
    if (this.timer)
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
  
  getDataset(): Observable<any> {
    return this.http.get<any>('/assets/datasets/dates.json', { observe: 'body' });
  }
}
