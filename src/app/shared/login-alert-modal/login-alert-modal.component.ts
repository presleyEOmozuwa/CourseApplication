import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-login-alert-modal',
  templateUrl: './login-alert-modal.component.html',
  styleUrls: ['./login-alert-modal.component.css']
})
export class LoginAlertModalComponent implements OnInit {

  @Input() val: any;
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onCloseClick(){
     this.close.emit();
  }

}
