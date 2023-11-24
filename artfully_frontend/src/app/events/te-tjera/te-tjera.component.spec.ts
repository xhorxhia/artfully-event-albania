import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeTjeraComponent } from './te-tjera.component';

describe('TeTjeraComponent', () => {
  let component: TeTjeraComponent;
  let fixture: ComponentFixture<TeTjeraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeTjeraComponent]
    });
    fixture = TestBed.createComponent(TeTjeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
