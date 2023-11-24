import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasmaKonfetaComponent } from './dasma-konfeta.component';

describe('DasmaKonfetaComponent', () => {
  let component: DasmaKonfetaComponent;
  let fixture: ComponentFixture<DasmaKonfetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DasmaKonfetaComponent]
    });
    fixture = TestBed.createComponent(DasmaKonfetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
