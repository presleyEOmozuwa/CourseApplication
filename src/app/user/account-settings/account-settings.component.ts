import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { LoginService } from 'src/app/core/authServices/login.service';
import { IPersonalDetails } from 'src/app/core/models/personal-details.interface';
import { IPasswordCreds } from 'src/app/core/models/password-creds.interface';
import { UserService } from 'src/app/core/userServices/user.service';
import { localStoreToken } from 'src/app/core/utils/localstorage-creds.interface';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  
  payload: IPersonalDetails = {
    firstName: null,
    lastName: null,
    email: null,
    userName: null
  }

  creds: IPasswordCreds = {
    passwordHash: null,
    password: null,
    confirmPassword: null
  }
  constructor(private loginService: LoginService, private userService: UserService, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.getAppUserById();
  };

  personAccountDetails()
  {
     const id: string = localStoreToken().nameid;
     const observer: any = {
      next : (res: any) => {
        console.log(res);
        this.alertService.danger("Personal Details Successfully Updated.");
      },
      error : (error: any) => {
        console.log(error);
        this.alertService.danger(`Personal Details Update errors : ${error}`);
      }
    }
     console.log(this.payload);
    this.userService.updatedUserPersonalDetails(id, this.payload).subscribe(observer);
  }

  signInAndSecurity(){
    const id: string = localStoreToken().nameid;
    const observer: any = {
    next : (res: any) => {
      console.log(res);
      this.alertService.danger("Login Credentials Successfully Updated.");
    },
    error : (error: any) => {
      console.log(error);
      this.alertService.danger(`Login Credential Update errors : ${error}`);
    }
  }
   this.userService.updatedUserLoginCredentials(id, this.creds).subscribe(observer);
  }

  
  getAppUserById(){
    const id: string = localStoreToken().nameid;
     this.userService.getUserById(id).subscribe(data => {
        this.payload.firstName = data.firstName;
        this.payload.lastName = data.lastName;
        this.payload.email = data.email;
        this.payload.userName = data.userName;
     })
  }

  deleteAccount(){
    const id: string = localStoreToken().nameid;
    const observer: any = {
      next : (res: any) => {
        console.log(res);
        localStorage.removeItem('token');
        this.alertService.danger("Account Successfully Closed.");
        this.router.navigate(['/']);
      },
      error : (error: any) => {
        console.log(error);
        this.alertService.danger(`Account Deletion errors : ${error}`);
      }
    }
     const isdecided: boolean = confirm("Are you sure you want to close account?")
     if(isdecided){
       this.userService.deleteUserAccount(id).subscribe(observer);
     }
  }

}
