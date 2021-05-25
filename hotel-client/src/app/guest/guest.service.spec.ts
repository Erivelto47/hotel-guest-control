import { TestBed } from '@angular/core/testing';

import { GuestService } from './guest.service';

describe('TestService', () => {
  let service: GuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestService);
    service = new GuestService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
