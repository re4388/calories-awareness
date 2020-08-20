import { TestBed } from '@angular/core/testing';

import { CalorieRecordService } from './calorie-record.service';

describe('CalorieRecordService', () => {
  let service: CalorieRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalorieRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
