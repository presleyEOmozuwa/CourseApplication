import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from '@full-fledged/alerts';
import { UserService } from 'src/app/core/userServices/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm)
  {
    const email: string = f.value.email;
    const lastName: string = f.value.lastName; 

    console.log(email);
    console.log(lastName);
    this.userService.sendForgotPasswordCreds(email, lastName).subscribe(res =>
      {
        console.log(res.Message);
        this.alertService.danger("Check your inbox for password reset link to continue...");
      })
  }

}
