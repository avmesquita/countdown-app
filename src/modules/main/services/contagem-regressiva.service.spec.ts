import { TestBed } from '@angular/core/testing';

import { ContagemRegressivaService } from './contagem-regressiva.service';

describe('ContagemRegressivaService', () => {
  let service: ContagemRegressivaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContagemRegressivaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
