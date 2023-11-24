import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasmaComponent } from './dasma.component';

describe('DasmaComponent', () => {
  let component: DasmaComponent;
  let fixture: ComponentFixture<DasmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DasmaComponent]
    });
    fixture = TestBed.createComponent(DasmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
