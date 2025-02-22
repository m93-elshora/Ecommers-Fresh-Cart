import { CurrencyPipe } from '@angular/common';
import { IAllorders } from '../../core/interfaces/iallorders';
import { PaymentService } from '../../core/services/payment.service';
import { AuthService } from './../../core/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit , OnDestroy {
  userInfo!:any
  allOrders!:IAllorders[]
  loggedSubscription!:Subscription
  orderSubscription!:Subscription
  constructor(private _AuthService:AuthService , private _PaymentService:PaymentService , private _CartService:CartService){}
  ngOnInit(): void {
    this.loggedSubscription = this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{ this._CartService.numCartItemsSubject.next(res.numOfCartItems)  }
    })
    this.userInfo = this._AuthService.saveDecodedToken()
    this.orderSubscription = this._PaymentService.getUserOrders(this.userInfo.id).subscribe({
      next:(res)=>{
        this.allOrders = res
      }
    })
  }
  ngOnDestroy(): void {
    this.loggedSubscription?.unsubscribe(),
    this.orderSubscription?.unsubscribe()
  }
}
