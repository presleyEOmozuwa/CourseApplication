import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IShoppingCart } from 'src/app/core/models/shopping-cart.interface';
import { LoginService } from 'src/app/core/authServices/login.service';
import { ShoppingCartService } from 'src/app/core/cartServices/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart: Observable<IShoppingCart> = null;
  constructor(private loginService: LoginService, private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.getShoppingCart();
  }

  getShoppingCart(){
    const id: string = this.loginService.loggedInUser.nameid;
    this.shoppingCart = this.cartService.getShoppingCartItems(id);
  }
  
}
