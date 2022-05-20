import { TestBed } from '@angular/core/testing';

import { GuardEtudiantService } from './guard-etudiant.service';

describe('GuardEtudiantService', () => {
  let service: GuardEtudiantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardEtudiantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
