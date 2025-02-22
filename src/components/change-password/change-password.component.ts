import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit,OnDestroy{
  changePasswordSubscription!:Subscription
  timeoutId!:any
  constructor(private _FormBuilder:FormBuilder,private _AuthService:AuthService,private _Router:Router,private _ToastrService:ToastrService){}
  changePasswordForm:FormGroup = this._FormBuilder.group({
    email:[{ value: '', disabled: true },[Validators.required,Validators.email]],
    newPassword:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]]
  })
  ngOnInit(): void {
    const confirmedEmail = sessionStorage.getItem('confirmedEmail');
    if (confirmedEmail) {
      this.changePasswordForm.patchValue({ email: confirmedEmail });
    } else {
      this._Router.navigate(['/forgetPassword']);
    }
  }
  resetPassword():void{
    if(this.changePasswordForm.valid){
      const resetData = {
        email: this.changePasswordForm.get('email')?.value,
        newPassword: this.changePasswordForm.get('newPassword')?.value,
      };
      this.changePasswordSubscription=this._AuthService.resetPassword(resetData).subscribe({
        next:(res)=>{          
          this._ToastrService.info(res.message,"Fresh Cart",{closeButton:true,timeOut:2000})
          this.timeoutId=setTimeout( ()=>{
            this._Router.navigate(['/login'])
          } , 1000 )
        }
      })
    }else{
      this.changePasswordForm.markAllAsTouched()
    }
      
  }
  ngOnDestroy(): void {
    clearTimeout(this.timeoutId)
    this.changePasswordSubscription?.unsubscribe()
  }
}
