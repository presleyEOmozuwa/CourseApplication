import { Component, OnInit } from '@angular/core';
import { AlertService } from '@full-fledged/alerts';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private alertService: AlertService) { }
  ngOnInit(): void {
     this.alertService.info("This is the Beginning");
  }
}
