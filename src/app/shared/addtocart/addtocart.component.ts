import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/authServices/login.service';
import { ShoppingCartService } from 'src/app/core/cartServices/shopping-cart.service';
import { ICartTrackers } from 'src/app/core/models/cart-trackers-interface';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit {

  @Input() courseId: string = null;
  constructor(private cartService: ShoppingCartService, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  addToCart(){
    const id: string = this.loginService.loggedInUser.nameid;
    this.cartService.addItemToCart(id, this.courseId).subscribe((res: ICartTrackers) => {
      console.log(res);
      console.log(id);
    })
  }

}
