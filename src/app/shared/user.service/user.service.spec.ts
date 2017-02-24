import { inject, TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('User Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [UserService]});
  });

  it('should ...', inject([UserService], (api) => {
    expect(api.title).toBe('Angular 2');
  }));
});
