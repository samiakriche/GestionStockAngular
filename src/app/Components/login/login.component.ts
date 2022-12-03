import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/Shared/services/log-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ErrorAuth: boolean
  loginForm :FormGroup
  remember : boolean =false;
  constructor(private fb:FormBuilder,
    private logInService :LogInService,
    private router : Router
    ) { }

  ngOnInit(): void {
    const currentEmployee = this.logInService.currentEmployee
    if(currentEmployee){
      this.router.navigate(["home/dashboard"])

    }
    this.buildForm();
  }

  buildForm(){
    this.loginForm = this.fb.group({
      username : ["", Validators.required],
      password : ["", Validators.required],

    })
  }
  logIn(){
    const fd = new FormData();
     fd.append("username",this.loginForm.controls["username"].value )
     fd.append("password", this.loginForm.controls["password"].value)
    this.logInService.LogIn(fd ,this.remember).subscribe(data=>{
      this.ErrorAuth =false

      this.router.navigate(["home/dashboard"])
    }, error=>{
        this.ErrorAuth =true
    })
  }
}
