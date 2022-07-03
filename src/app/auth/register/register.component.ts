import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { match } from 'src/app/core/utils/compare.validator';
import { IRegisterUser } from 'src/app/core/models/register-payload.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from 'src/app/core/authServices/register.service';
import { AlertService } from '@full-fledged/alerts';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm: FormGroup;
  
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private registerService: RegisterService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: [match('password', 'confirmPassword')] });
  };

  
  onSubmit(): void{
    const userData: IRegisterUser = this.registerForm.value;
    this.registerService.register(userData).subscribe(data => {
      console.log(userData);
      console.log(data);
      this.alertService.info("Check your inbox for email confirmation link.");
    })
  }

  get f(): { [key: string]: AbstractControl } 
  {
    return this.registerForm.controls;
  }

}
