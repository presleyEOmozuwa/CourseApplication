import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourse } from 'src/app/core/models/course.interface';
import { CourseService } from 'src/app/core/productServices/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICartTrackers } from 'src/app/core/models/cart-trackers-interface';
import { AlertService } from '@full-fledged/alerts';
import { ShoppingCartService } from 'src/app/core/cartServices/shopping-cart.service';
import { MessengerService } from 'src/app/core/commonServices/messenger.service';
import { localStoreToken } from 'src/app/core/utils/localstorage-creds.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  course: Observable<ICourse>;
    
  constructor(private courseService: CourseService, private route: ActivatedRoute, private alertService: AlertService, private cartService: ShoppingCartService, private router: Router, private messengerService: MessengerService) { }

  ngOnInit(): void {
    this.getCourseWithId();
  }

  getCourseWithId(){
    const courseId: string = this.route.snapshot.paramMap.get('courseId');
    this.course = this.courseService.getCourseById(courseId);
  }

  addToCart(courseId: string){
    if(!localStorage.getItem('token'))
    {
      this.alertService.danger("Login to continue...");
    }
    const id: string =  localStoreToken().nameid;
    this.cartService.addItemToCart(id, courseId).subscribe((res: ICartTrackers) => {
      console.log(res)
      if(res.alreadyAdded == true)
      {
        this.alertService.danger("Already exist in your shopping cart, it can only be added once.");
      }
      
      if(res.newlyAdded == true)
      {  
        this.messengerService.setAddCounter(res.itemCounter);
        this.router.navigate(['/products/added', res.addedCourseId]);
      }
    })
  }

  buyNow(priceId: string){
    if(!localStorage.getItem('token')){
      this.router.navigate(['/auth/login']);
    }
    this.cartService.sessionIdForSinglePayment(priceId);
  }

  isLoggedIn(): boolean{
    if(localStorage.getItem('token')){
      return true;
    }
  }

}
