import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagezimeComponent } from './pagezime.component';

describe('PagezimeComponent', () => {
  let component: PagezimeComponent;
  let fixture: ComponentFixture<PagezimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagezimeComponent]
    });
    fixture = TestBed.createComponent(PagezimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
