import { TestBed } from '@angular/core/testing';

import { DrivingService } from './driving.service';

describe('DrivingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DrivingService = TestBed.get(DrivingService);
    expect(service).toBeTruthy();
  });
});
