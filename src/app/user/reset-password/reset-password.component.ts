import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { UserService } from 'src/app/core/userServices/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
  }
  onSubmit(f: NgForm) {
    const token: string = this.route.snapshot.queryParams['token'];
    const id: string = this.route.snapshot.queryParams['id'];
    const password: string = f.value.password;
    const confirmPassword: string = f.value.confirmPassword;
    const observer: any = {
      next: (val: any) => {
        console.log(val);
        if(val.isPasswordResetSuccessful == true){
          this.router.navigate(['/auth/login']);
        }
        
      },
      error: (res : any) => {
        console.log(res);
        if(res.error.isPasswordResetSuccessful == false){
          this.alertService.danger("Password reset failed, try again later");
        }
      }
    }
    this.userService.sendResetPasswordCreds(token, id, password, confirmPassword).subscribe(observer);
  }

}
