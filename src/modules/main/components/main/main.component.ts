import { Component, OnDestroy, enableProdMode } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { eTheme } from '../../enum/etheme.enum';
import { SubSink } from 'subsink';
import { IpService } from '../../services/ip.service';
import slugify from 'slugify';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy {
  private subs = new SubSink();
  theme: eTheme = eTheme.Light;
  
  constructor(private themeService: ThemeService,
              private ipService: IpService,
              private window: Window,
              private service: MainService) {   
    try {      
      this.service.productionMode();
      this.subs.sink = this.themeService.theme$.subscribe( (theme: any) => {
        this.theme = theme;      
      });
      this.ipService.getIPAddress().subscribe( (data: any) => {
        const user = btoa('ip_' +slugify(data.ip).replaceAll('.','-'));
        (<any>this.window).gtag('set', {'user_id': user });
        const evt = {
            event_category: 'user_identified',
            event_label: 'setUser',
            value: user
        };
        (<any>this.window).gtag('event', 'user_identified', evt);
        localStorage.setItem('userId', user);
      },(error: any) => {
        console.log('Ops!');
      });
    } catch { }
    /*
    this.subs.sink = this.ipService.getIP().subscribe( (data: any) => {
      console.log('getIP => ', data);
    }, (error: any) => { console.log('getIP',error); });
    */
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  isThemeIsLight(): boolean {
    return this.theme === eTheme.Light;
  }

}

