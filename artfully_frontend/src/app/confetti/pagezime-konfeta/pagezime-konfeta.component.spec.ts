import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagezimeKonfetaComponent } from './pagezime-konfeta.component';

describe('PagezimeKonfetaComponent', () => {
  let component: PagezimeKonfetaComponent;
  let fixture: ComponentFixture<PagezimeKonfetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagezimeKonfetaComponent]
    });
    fixture = TestBed.createComponent(PagezimeKonfetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
