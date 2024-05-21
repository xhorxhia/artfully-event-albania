import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypeComponent } from './event-type.component';

describe('EventTypeComponent', () => {
  let component: EventTypeComponent;
  let fixture: ComponentFixture<EventTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventTypeComponent]
    });
    fixture = TestBed.createComponent(EventTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
