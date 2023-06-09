import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSnackbarComponent } from './success-snackbar.component';

describe('SuccessSnackbarComponent', () => {
  let component: SuccessSnackbarComponent;
  let fixture: ComponentFixture<SuccessSnackbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessSnackbarComponent]
    });
    fixture = TestBed.createComponent(SuccessSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
