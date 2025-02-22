import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-code',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.css'
})
export class ResetCodeComponent implements OnDestroy{
  resetCodeSubscription!:Subscription
  timeoutId!:any
  constructor(private _FormBuilder:FormBuilder ,private _AuthService:AuthService,private _Router:Router , private _ToastrService:ToastrService){}
  resetCodeForm:FormGroup = this._FormBuilder.group({
    resetCode : [null,[Validators.required]]
  })
  sendResetCode(){
    if(this.resetCodeForm.valid){
      this.resetCodeSubscription=this._AuthService.verifyResetCode(this.resetCodeForm.value.resetCode.toString()).subscribe({
        next:(res)=>{
          const email = sessionStorage.getItem('email');
          if (email) {
            sessionStorage.setItem('confirmedEmail', email);
          }
          this._ToastrService.info(res.status,"Fresh Cart",{closeButton:true,timeOut:2000})
          this.timeoutId=setTimeout( ()=>{
            this._Router.navigate(['/changePassword'])
          } , 2000 )
        }
      })
    }else{
      this.resetCodeForm.markAllAsTouched()
    }
  }
  ngOnDestroy(): void {
    clearTimeout(this.timeoutId)
    this.resetCodeSubscription?.unsubscribe()
  }
}
