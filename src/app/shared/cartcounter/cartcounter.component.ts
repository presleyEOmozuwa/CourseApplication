import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartcounter',
  templateUrl: './cartcounter.component.html',
  styleUrls: ['./cartcounter.component.css']
})
export class CartcounterComponent implements OnInit {

  counter: number = 10;
  constructor() { }
  ngOnInit(): void {
  }

}
