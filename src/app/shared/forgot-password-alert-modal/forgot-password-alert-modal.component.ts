import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-forgot-password-alert-modal',
  templateUrl: './forgot-password-alert-modal.component.html',
  styleUrls: ['./forgot-password-alert-modal.component.css']
})
export class ForgotPasswordAlertModalComponent implements OnInit {

  @Input() val: any;
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onCloseClick(){
     this.close.emit();
  }
}
