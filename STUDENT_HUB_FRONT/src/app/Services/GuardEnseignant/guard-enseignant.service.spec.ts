import { TestBed } from '@angular/core/testing';

import { GuardEnseignantService } from './guard-enseignant.service';

describe('GuardEnseignantService', () => {
  let service: GuardEnseignantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardEnseignantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
