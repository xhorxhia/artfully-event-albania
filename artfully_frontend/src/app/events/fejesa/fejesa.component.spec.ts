import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FejesaComponent } from './fejesa.component';

describe('FejesaComponent', () => {
  let component: FejesaComponent;
  let fixture: ComponentFixture<FejesaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FejesaComponent]
    });
    fixture = TestBed.createComponent(FejesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
