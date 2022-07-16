import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/authServices/login.service';
import { ShoppingCartService } from 'src/app/core/cartServices/shopping-cart.service';
import { localStoreToken } from 'src/app/core/utils/localstorage-creds.interface';

@Component({
  selector: 'app-auth-links',
  templateUrl: './auth-links.component.html',
  styleUrls: ['./auth-links.component.css']
})
export class AuthLinksComponent implements OnInit {

  constructor(private loginSevice: LoginService, private router: Router, private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean{
    if(localStorage.getItem('token')){
      return true;
    }
  }

  logout(){
    const isdecided: boolean = confirm("Are you sure you want to log out from your account?")
    if(isdecided){
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }
  }

  displayFirstName(): string{
    return localStoreToken().name;
  }

  goToPortal(){
    this.cartService.redirectToCustomerPortal();
  }

}
