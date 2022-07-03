import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/authServices/login.service';
import { IUser } from 'src/app/core/models/current-user.interface';
import { ILogin } from 'src/app/core/models/login-payload.interface';
import { IGoogleUser } from 'src/app/core/models/google-user.interface';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  googleCredentials: IGoogleUser = {
    provider: null,
    idToken: null
  }
  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      rememberMe: [false, []]
    })
  }
   
    
    onSubmit(): void{
      const credentials: ILogin = this.loginForm.value;
      this.loginService.login(credentials).subscribe((user: IUser) => {
        console.log(user)
      });
    }

    
    loginWithGoogle(){
      this.loginService.signInIdentityUser().then((user: SocialUser) => {
        console.log(user);
        this.googleCredentials.provider = user.provider
        this.googleCredentials.idToken = user.idToken;
        this.loginService.googleIdentityLogger(this.googleCredentials).subscribe((googleUser: IUser) => {
          console.log(googleUser)
        });
      });
    }

    
    get g(): { [key: string]: AbstractControl } 
    {
      return this.loginForm.controls;
    }
  
}
