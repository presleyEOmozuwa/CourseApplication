import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MessengerService } from 'src/app/core/commonServices/messenger.service';

@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.css']
})
export class CartWidgetComponent implements OnInit {

  constructor(private messengerService: MessengerService) { }
  
   counter: number;
  ngOnInit(): void {
    this.getAddedCounter();
    this.getDeleteCounter();
  }

  getAddedCounter(){
    this.messengerService.getAddCounter().subscribe(num => {
      this.counter = num;
    })
  }

  getDeleteCounter(){
    this.messengerService.getRemoveCounter().subscribe(num => {
      this.counter = num;
    })
  }

  isLoggedIn():boolean{
    if(localStorage.getItem('token')
    ){
      return true;
    }
  }

}
