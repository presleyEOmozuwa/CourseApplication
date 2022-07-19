import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomMaterialModule } from '../core/utils/material.module';
import { AuthLinksComponent } from './auth-links/auth-links.component';
import { CartWidgetComponent } from './cart-widget/cart-widget.component';
import { LoginAlertModalComponent } from './login-alert-modal/login-alert-modal.component';
import { RegisterAlertModalComponent } from './register-alert-modal/register-alert-modal.component';
import { CartAlertModalComponent } from './cart-alert-modal/cart-alert-modal.component';
import { ProductDetailsAlertModalComponent } from './product-details-alert-modal/product-details-alert-modal.component';
import { AccountSettingsAlertModalComponent } from './account-settings-alert-modal/account-settings-alert-modal.component';
import { EmailConfirmationAlertModalComponent } from './email-confirmation-alert-modal/email-confirmation-alert-modal.component';
import { ForgotPasswordAlertModalComponent } from './forgot-password-alert-modal/forgot-password-alert-modal.component';
import { ResetPasswordAlertModalComponent } from './reset-password-alert-modal/reset-password-alert-modal.component';


@NgModule({
  declarations: [
    AuthLinksComponent,
    CartWidgetComponent,
    LoginAlertModalComponent,
    RegisterAlertModalComponent,
    CartAlertModalComponent,
    ProductDetailsAlertModalComponent,
    AccountSettingsAlertModalComponent,
    EmailConfirmationAlertModalComponent,
    ForgotPasswordAlertModalComponent,
    ResetPasswordAlertModalComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    CustomMaterialModule
  ],
  exports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    CustomMaterialModule,
    AuthLinksComponent,
    CartWidgetComponent,
    LoginAlertModalComponent,
    RegisterAlertModalComponent,
    CartAlertModalComponent,
    ProductDetailsAlertModalComponent,
    AccountSettingsAlertModalComponent,
    EmailConfirmationAlertModalComponent,
    ForgotPasswordAlertModalComponent,
    ResetPasswordAlertModalComponent

  ]
})
export class SharedModule { }

