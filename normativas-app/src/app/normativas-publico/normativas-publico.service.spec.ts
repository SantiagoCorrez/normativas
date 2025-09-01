import { TestBed } from '@angular/core/testing';

import { NormativasPublicoService } from './normativas-publico.service';

describe('NormativasPublicoService', () => {
  let service: NormativasPublicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NormativasPublicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
