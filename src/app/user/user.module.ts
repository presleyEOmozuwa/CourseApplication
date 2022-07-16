import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../app/shared/shared.module';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { SuccessPaymentComponent } from './success-payment/success-payment.component';
import { FailurePaymentComponent } from './failure-payment/failure-payment.component';


@NgModule({
  declarations: [
    EmailConfirmationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AccountSettingsComponent,
    SuccessPaymentComponent,
    FailurePaymentComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
