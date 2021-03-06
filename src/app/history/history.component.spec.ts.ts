// This shows a different way of testing a component, check about for a simpler one
import { Component } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';

describe('History Component', () => {
  const html = '<app-task-history></app-task-history>';

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [HistoryComponent, TestComponent]});
    TestBed.overrideComponent(TestComponent, { set: { template: html }});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('History Works!');
  });

});

@Component({selector: 'my-test', template: ''})
class TestComponent { }
