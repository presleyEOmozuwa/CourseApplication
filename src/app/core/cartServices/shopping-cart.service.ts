import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartTrackers } from '../models/cart-trackers-interface';
import { ICourse } from '../models/course.interface';
import { IShoppingCart } from '../models/shopping-cart.interface';
import { getHttpOptions } from '../utils/authorization.headers';

declare const Stripe: any

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private httpClient: HttpClient) { }

  getShoppingCartItems(id: string): Observable<IShoppingCart>
  {
    const url: string = `https://localhost:7016/api/cartstore/cart/${id}`;
    return this.httpClient.get<any>(url, getHttpOptions())
  };
  
  
  addItemToCart( id: string, courseId: string ): Observable<ICartTrackers> {
      const url: string = "https://localhost:7016/api/cartstore/addtocart";
      const body = {
        id: id,
        courseId: courseId
      }
      return this.httpClient.post<any>(url, body, getHttpOptions());
  };

  
  removeItemFromCart(id: string, courseId: string): Observable<ICartTrackers> {
      const url: string = "https://localhost:7016/api/cartstore/removefromcart";
      const body = {
        id: id,
        courseId: courseId
      }
      return this.httpClient.post<any>(url, body, getHttpOptions());
  };

}
