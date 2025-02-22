import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{
  loginSub!:Subscription
  userInfo!:any
  timeoutId!:any
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService ,private _Router:Router , private _ToastrService:ToastrService){}
  loginForm:FormGroup =this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]]
  })
  loginUser():void {
    if(this.loginForm.valid){
      this.loginSub=this._AuthService.loginUser(this.loginForm.value).subscribe({
        next:(res)=>{
          this._ToastrService.success(`Welcome ${res.user.name.substring(0,1).toUpperCase()}${res.user.name.substring(1,)}`, 'Fresh Cart', { closeButton: true, timeOut: 2000 });
          sessionStorage.setItem( 'token', res.token )
          this.userInfo = this._AuthService.saveDecodedToken()
          this.timeoutId=setTimeout( ()=>{
            this._Router.navigate(['/home'])
          } , 1000 )
        }
      })
    }else{
      this.loginForm.markAllAsTouched()
    }  
  }
  ngOnDestroy(): void {
    clearTimeout(this.timeoutId)
    this.loginSub?.unsubscribe()
  }
}
