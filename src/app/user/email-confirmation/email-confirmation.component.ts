import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { UserService } from 'src/app/core/userServices/user.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  constructor(private route: ActivatedRoute, private userService: UserService, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.emailConfirmationCreds();
  }

  emailConfirmationCreds(){
    const id: string = this.route.snapshot.queryParams['id'];
    const token: string = this.route.snapshot.queryParams['token'];
    const observer: any = {
      next : (result: any) => {
        console.log(result);
        this.router.navigate(['/auth/login']);
      },
      error : (error: any) => {
        console.log(error);
        this.alertService.danger(`Email confirmation errors : ${error}`);
      }
    }
    this.userService.sendConfirmEmail(id, token).subscribe(observer)
  }

}
