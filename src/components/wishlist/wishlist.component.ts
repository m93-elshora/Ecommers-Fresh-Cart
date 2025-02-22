import { WishlistService } from './../../core/services/wishlist.service';
import { Component , OnDestroy, OnInit} from '@angular/core';
import { IWishlist } from '../../core/interfaces/iwishlist';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CarouselModule,CurrencyPipe , RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit , OnDestroy{
 constructor(private _WishlistService:WishlistService , private _CartService:CartService,private _ToastrService: ToastrService){}
 wishlistData:IWishlist | null = null
 wishlistSubscription!:Subscription
 AddProductToCartSubscription!:Subscription
 removeProductFromWishlistSubscription!:Subscription
 ngOnInit(): void {
   this.wishlistSubscription = this._WishlistService.getLoggedUserWishlist().subscribe({
    next:(res)=>{
      this.wishlistData = res
    }
   })
 }
 ngOnDestroy(): void {
   this.wishlistSubscription?.unsubscribe(),
   this.AddProductToCartSubscription?.unsubscribe(),
   this.removeProductFromWishlistSubscription?.unsubscribe()
 }
 addItemToCart(productId:string){
  this.AddProductToCartSubscription = this._CartService.AddProductToCart(productId).subscribe({
    next:(res)=>{
      this._CartService.numCartItemsSubject.next(res.numOfCartItems)
      this._ToastrService.success(res.message,"Fresh Cart",{closeButton:true,timeOut:2000})
    }
  })
}
removeItemFromWishlist(p_id:string):void{
  this.removeProductFromWishlistSubscription = this._WishlistService.removeProductFromWishlist(p_id).subscribe({
    next:()=>{;
      this._WishlistService.getLoggedUserWishlist().subscribe({
        next:(res)=>{
          this.wishlistData = res
        }
       })
      this._ToastrService.error("Removed from Wishlist","Fresh Cart",{closeButton:true,timeOut:2000})
    }
  })
}

}

