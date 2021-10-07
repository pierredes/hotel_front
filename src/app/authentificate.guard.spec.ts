import { TestBed } from '@angular/core/testing';

import { AuthentificateGuard } from './authentificate.guard';

describe('AuthentificateGuard', () => {
  let guard: AuthentificateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthentificateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
