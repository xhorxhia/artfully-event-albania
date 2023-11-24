import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DitelindjeComponent } from './ditelindje.component';

describe('DitelindjeComponent', () => {
  let component: DitelindjeComponent;
  let fixture: ComponentFixture<DitelindjeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DitelindjeComponent]
    });
    fixture = TestBed.createComponent(DitelindjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
