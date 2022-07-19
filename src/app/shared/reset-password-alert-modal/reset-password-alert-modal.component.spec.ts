import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordAlertModalComponent } from './reset-password-alert-modal.component';

describe('ResetPasswordAlertModalComponent', () => {
  let component: ResetPasswordAlertModalComponent;
  let fixture: ComponentFixture<ResetPasswordAlertModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordAlertModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordAlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
