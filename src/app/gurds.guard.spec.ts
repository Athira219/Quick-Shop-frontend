import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gurdsGuard } from './gurds.guard';

describe('gurdsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gurdsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
