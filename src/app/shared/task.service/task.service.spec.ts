import { inject, TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';

describe('Task Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [TaskService]});
  });

  it('should ...', inject([TaskService], (api) => {
    expect(api.title).toBe('Angular 2');
  }));
});
