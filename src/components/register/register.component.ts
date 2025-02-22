import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
  registerSub!:Subscription
  intervalId!:any
  constructor(private _AuthService:AuthService ,private _Router:Router,private _ToastrService:ToastrService){}

  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null , [Validators.required,Validators.minLength(3),Validators.maxLength(10)]) , 
    email: new FormControl (null,[Validators.required,Validators.email]),
    password: new FormControl (null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl (null),
    phone: new FormControl (null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  } , this.confirmPassword)

  confirmPassword(g:AbstractControl){
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null
    }else{
      return {missMatch: true}
    }
  }

  registerUser():void{
    if(this.registerForm.valid){
      this.registerSub=this._AuthService.registerClient(this.registerForm.value).subscribe({
        next:(res)=>{
          this._ToastrService.success(res.message,"Fresh Cart",{closeButton:true,timeOut:2000})
          this.intervalId=setInterval( ()=>{
            this._Router.navigate(['/login'])
          } , 1000 )
        }
      });
    }else{
      this.registerForm.setErrors({'missMatch':true})
      this.registerForm.markAllAsTouched()
    }  
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId)
    this.registerSub?.unsubscribe()
  }
}
