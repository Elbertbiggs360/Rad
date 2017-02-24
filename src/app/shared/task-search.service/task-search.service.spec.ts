import { inject, TestBed } from '@angular/core/testing';

import { TaskSearchService } from './task-search.service';

describe('Api Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [TaskSearchService]});
  });

  it('should ...', inject([TaskSearchService], (api) => {
    expect(api.title).toBe('Angular 2');
  }));
});
