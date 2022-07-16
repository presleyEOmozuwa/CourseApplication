import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomMaterialModule } from '../core/utils/material.module';
import { CartcounterComponent } from './cartcounter/cartcounter.component';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { AuthLinksComponent } from './auth-links/auth-links.component';
import { CartWidgetComponent } from './cart-widget/cart-widget.component';


@NgModule({
  declarations: [
    CartcounterComponent,
    ViewcartComponent,
    AuthLinksComponent,
    CartWidgetComponent
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
    CartcounterComponent,
    ViewcartComponent,
    AuthLinksComponent,
    CartWidgetComponent
  ]
})
export class SharedModule { }

