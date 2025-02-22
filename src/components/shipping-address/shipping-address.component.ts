import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.css'
})
export class ShippingAddressComponent implements OnInit , OnDestroy{
  loading:boolean=false
  cartId!:string | null
  createCashOrderSub!:Subscription
  checkoutSessionSub!:Subscription
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _PaymentService = inject(PaymentService)
  private readonly _Router = inject(Router)
  shippingAddress:FormGroup = this._FormBuilder.group({
    details:[null,Validators.required],
    phone:[null,Validators.required],
    city:[null,Validators.required],
    paymentMethod:[null,Validators.required]
  })
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId = params.get('cart_id')
      }
    })
  }

  payOrder():void{
    const formData = this.shippingAddress.value
    this.loading=true
    if(this.shippingAddress.value.paymentMethod ==='cash'){
      this.createCashOrderSub = this._PaymentService.createCashOrder(this.cartId,this.shippingAddress.value).subscribe({
        next:()=>{
          this.loading=false
          this._Router.navigate(['/allorders'])
        }
      })
    }else if(formData.paymentMethod ==='online'){
      this.checkoutSessionSub = this._PaymentService.checkoutSession(this.cartId,this.shippingAddress.value).subscribe({
        next:(res)=>{
          this.loading=false
          window.open(res.session.url,'_self')
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.checkoutSessionSub?.unsubscribe(),
    this.createCashOrderSub?.unsubscribe()
  }
  
}
