import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  
  public behSubject = new BehaviorSubject<any>(0);
  public bSubject = new BehaviorSubject<any>(0);
  constructor() { }

  setAddCounter(counter: number)
  {  
      this.behSubject.next(counter);
  }

  getAddCounter()
  {
    return this.behSubject.asObservable();
  }

  setRemoveCounter(counter: number)
  {  
      this.bSubject.next(counter);
  }

  getRemoveCounter()
  {
    return this.bSubject.asObservable();
  }
}
