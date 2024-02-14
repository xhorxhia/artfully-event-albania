import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FejesaKonfetaComponent } from './fejesa-konfeta.component';

describe('FejesaKonfetaComponent', () => {
  let component: FejesaKonfetaComponent;
  let fixture: ComponentFixture<FejesaKonfetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FejesaKonfetaComponent]
    });
    fixture = TestBed.createComponent(FejesaKonfetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
