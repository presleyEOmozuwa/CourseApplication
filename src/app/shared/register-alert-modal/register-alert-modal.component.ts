import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-alert-modal',
  templateUrl: './register-alert-modal.component.html',
  styleUrls: ['./register-alert-modal.component.css']
})
export class RegisterAlertModalComponent implements OnInit {

  @Input() val: any;
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onCloseClick(){
     this.close.emit();
  }

}
