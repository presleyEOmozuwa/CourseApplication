import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-email-confirmation-alert-modal',
  templateUrl: './email-confirmation-alert-modal.component.html',
  styleUrls: ['./email-confirmation-alert-modal.component.css']
})
export class EmailConfirmationAlertModalComponent implements OnInit {

  @Input() val: any;
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onCloseClick(){
     this.close.emit();
  }

}
