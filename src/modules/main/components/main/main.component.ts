import { Component, OnDestroy, enableProdMode } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { eTheme } from '../../enum/etheme.enum';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy {
  private subs = new SubSink();
  theme: eTheme = eTheme.Light;
  
  constructor(private themeService: ThemeService) {    
    //enableProdMode();
    this.subs.sink = this.themeService.theme$.subscribe( (theme: any) => {
      this.theme = theme;
      //console.log('TEMA SELECIONADO EM MAIN = ', theme);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  isThemeIsLight(): boolean {
    return this.theme === eTheme.Light;
  }

}
