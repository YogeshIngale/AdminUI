import { TestBed } from '@angular/core/testing';

import { CommonToastrServiceService } from './common-toastr-service.service';

describe('CommonToastrServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonToastrServiceService = TestBed.get(CommonToastrServiceService);
    expect(service).toBeTruthy();
  });
});
