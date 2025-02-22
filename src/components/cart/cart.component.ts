import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit ,OnDestroy {
  constructor(private _CartService:CartService , private _ToastrService:ToastrService){}
  cartData:ICart | null= null
  getCartSubscription!:Subscription
  removeCartSubscription!:Subscription
  updateCartSubscription!:Subscription
  clearCartSubscription!:Subscription

  ngOnInit(): void {
    this.getCartSubscription = this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartData = res.data
        this._CartService.numCartItemsSubject.next(res.numOfCartItems)
      }
    })
  }
  
  removeCartItem(productId:string):void{
    this.removeCartSubscription = this._CartService.removeSpecificCartItem(productId).subscribe({
      next:(res)=>{
        this._CartService.numCartItemsSubject.next(res.numOfCartItems)
        this.cartData = res.data
        this._ToastrService.warning(`Item has been removed from cart`,"Fresh Cart",{closeButton:true,timeOut:2000})
      }
    })
  }
  updateItemQuantity(p_id:string,count:number):void{
    if(count > 0){
      this.updateCartSubscription = this._CartService.updateCartProductQuantity(p_id,count).subscribe({
        next:(res)=>{
          this.cartData = res.data
          this._CartService.numCartItemsSubject.next(res.numOfCartItems)
        } 
      })
    }
  }
  clearCart():void{
    this.clearCartSubscription = this._CartService.clearUserCart().subscribe({
      next:()=>{
        this._CartService.getLoggedUserCart().subscribe({
          next:(res)=>{
            this._CartService.numCartItemsSubject.next(res.numOfCartItems)
            this.cartData = res.data
            this._ToastrService.warning("Your shopping cart has been completely cleared.","Fresh Cart",{closeButton:true,timeOut:2000})
          }
        })
      }
    })
  }
  ngOnDestroy(): void {
    this.getCartSubscription?.unsubscribe(),
    this.clearCartSubscription?.unsubscribe(),
    this.updateCartSubscription?.unsubscribe(),
    this.removeCartSubscription?.unsubscribe()
  }
}
