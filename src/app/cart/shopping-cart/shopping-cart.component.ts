import { Component, OnInit } from '@angular/core';
import { IShoppingCart } from 'src/app/core/models/shopping-cart.interface';
import { ShoppingCartService } from 'src/app/core/cartServices/shopping-cart.service';
import { localStoreToken } from 'src/app/core/utils/localstorage-creds.interface';
import { MessengerService } from 'src/app/core/commonServices/messenger.service';
import { ICourse } from 'src/app/core/models/course.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart: IShoppingCart = {
    
    itemCounter: 0,
    allCourseModels: null
  };
  constructor(private cartService: ShoppingCartService, private messengerService: MessengerService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    const id: string = localStoreToken().nameid;
    this.cartService.getShoppingCart(id).subscribe(cart => {
      console.log(cart);
      this.shoppingCart.itemCounter = cart.itemCounter;
      this.shoppingCart.allCourseModels = cart.allCourseModels;
    })
  }

  removeFromCart(courseId: string){
    const isdecided: boolean = confirm("Are you sure you want to remove item from shopping cart?");
    if(isdecided){
      const id: string = localStoreToken().nameid;
      this.cartService.removeItemFromCart(id, courseId).subscribe(res => {
        console.log(res);
        this.messengerService.setRemoveCounter(res.itemCounter);
        this.getCart();
      })
    }
  }

  subTotal(): number {
    let total: number = 0;
    if(this.shoppingCart.allCourseModels != null)
    {
      this.shoppingCart.allCourseModels.forEach(item => {
      return total += item.price;
      });
    }
    return total;
  }

  checkout(){
    const selectedPriceIds: string[] = this.shoppingCart.allCourseModels.map((course: ICourse) => course.priceId);
    this.cartService.sessionIdForMultiplePayments(selectedPriceIds);
  }
  
}
