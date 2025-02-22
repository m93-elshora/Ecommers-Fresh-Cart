import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnDestroy {
  forgetPasswordSubscription!:Subscription
  timeoutId!:any
  constructor(private _FormBuilder:FormBuilder,private _AuthService:AuthService,private _Router:Router,private _ToastrService:ToastrService){}
  forgetPasswordForm:FormGroup = this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]]
  })
  forgetPassword():void{
    if(this.forgetPasswordForm.valid){
      const email = this.forgetPasswordForm.value.email;
      sessionStorage.setItem('email', email); 
      this.forgetPasswordSubscription = this._AuthService.forgetPassword({email}).subscribe({
        next:(res)=>{
          this._ToastrService.info(res.message,"Fresh Cart",{closeButton:true,timeOut:2000})
          this.timeoutId=setTimeout( ()=>{
            this._Router.navigate(['/resetCode'])
          } , 2000 )
        }
      })
    }else{
      this.forgetPasswordForm.markAllAsTouched()
    }
  }
  ngOnDestroy(): void {
    clearTimeout(this.timeoutId)
    this.forgetPasswordSubscription?.unsubscribe()
  }
}
