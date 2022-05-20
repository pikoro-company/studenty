import { TestBed } from '@angular/core/testing';

import { GuardClubService } from './guard-club.service';

describe('GuardClubService', () => {
  let service: GuardClubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardClubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
