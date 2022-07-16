import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartTrackers } from '../models/cart-trackers-interface';
import { IShoppingCart } from '../models/shopping-cart.interface';
import { IStripeSession } from '../models/stripe-session.interface';
import { getHttpOptions } from '../utils/authorization.headers';

declare const Stripe: any

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private httpClient: HttpClient) { }

  getShoppingCart(id: string): Observable<IShoppingCart> {
    const url: string = `https://localhost:7016/api/cartstore/shopping-cart/${id}`;
    return this.httpClient.get<any>(url, getHttpOptions())
  };


  addItemToCart(id: string, courseId: string): Observable<ICartTrackers> {
    const url: string = "https://localhost:7016/api/cartstore/add-course";
    const body = {
      id: id,
      courseId: courseId
    }
    return this.httpClient.post<any>(url, body, getHttpOptions());
  };


  removeItemFromCart(id: string, courseId: string): Observable<ICartTrackers> {
    const url: string = "https://localhost:7016/api/cartstore/remove-course";
    const body = {
      id: id,
      courseId: courseId
    }
    return this.httpClient.post<any>(url, body, getHttpOptions());
  };

  sessionIdForMultiplePayments(selectedPriceIds: string[]): void {

    const body: any =
    {
      priceIds: selectedPriceIds,
      successUrl: "https://localhost:4200/user/success-payment",
      failureUrl: "https://localhost:4200/user/failure-payment",
    }
    const url: string = "https://localhost:7016/api/multipleitempayment/create-checkout-session";

    const observer: any = {
      next: (session: IStripeSession) => {
        this.multiplePaymentsRedirectionToCheckout(session);
      },
      error: (error: any) => {
        console.log(error);
      }
    }
    this.httpClient.post<any>(url, body, getHttpOptions()).subscribe(observer)
  };

  multiplePaymentsRedirectionToCheckout(session: IStripeSession) {
    const stripe = Stripe(session.publicKey);
    stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });
  };

  sessionIdForSinglePayment(priceId: string) {
    const body: any =
    {
      priceId: priceId,
      successUrl: "https://localhost:4200/user/success-payment",
      failureUrl: "https://localhost:4200/user/failure-payment",
    }
    const url: string = "https://localhost:7016/api/singleitempayment/create-checkout-session";

    const observer: any = {
      next: (session: IStripeSession) => {
        this.singlePaymentRedirectToCheckout(session);
      },
      error: (error: any) => {
        console.log(error);
      }
    }
    this.httpClient.post<any>(url, body, getHttpOptions()).subscribe(observer)
  };

  singlePaymentRedirectToCheckout(session: IStripeSession) {
    const stripe = Stripe(session.publicKey);

    stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });
  }

  redirectToCustomerPortal() {
    const portalUrl: string = "https://localhost:7016/api/portal/customer-portal";
    const returnUrl: string = "http://localhost:4200/user/account-settings";
    const body: any =
    {
      returnUrl: returnUrl
    }
    const observer: any = {
      next: (data: any) => {
        window.location.href = data.url;
      },
      error: (error: any) => {
        console.log(error);
      }
    }
    this.httpClient.post<any>(portalUrl, body, getHttpOptions()).subscribe(observer)
  };
}


