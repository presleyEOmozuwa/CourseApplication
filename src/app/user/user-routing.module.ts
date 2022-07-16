import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { SuccessPaymentComponent } from './success-payment/success-payment.component';
import { FailurePaymentComponent } from './failure-payment/failure-payment.component';


const routes: Routes = [
  { path: 'email-confirm', component: EmailConfirmationComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'account-settings', component: AccountSettingsComponent },
  { path: 'success-payment', component: SuccessPaymentComponent },
  { path: 'failure-payment', component: FailurePaymentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
