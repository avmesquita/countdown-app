import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContagemRegressivaComponent } from './contagem-regressiva.component';

describe('ContagemRegressivaComponent', () => {
  let component: ContagemRegressivaComponent;
  let fixture: ComponentFixture<ContagemRegressivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContagemRegressivaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContagemRegressivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
