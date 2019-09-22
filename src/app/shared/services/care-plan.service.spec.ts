import { TestBed } from '@angular/core/testing';

import { CarePlanService } from './care-plan.service';

describe('CarePlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarePlanService = TestBed.get(CarePlanService);
    expect(service).toBeTruthy();
  });
});
