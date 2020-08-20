import { TestBed } from '@angular/core/testing';

import { CalorisService0Service } from './calories-service0.service';

describe('CalorisService0Service', () => {
  let service: CalorisService0Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalorisService0Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
