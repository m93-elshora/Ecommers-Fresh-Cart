import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit , OnDestroy {
  private readonly _ProductsService =inject(ProductsService)
  private readonly _CartService =inject(CartService)
  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _ToastrService =inject(ToastrService)
  productId!:string | null
  productDetails:IProduct | null=null 
  activeRouteSubscription!:Subscription
  getProductSubscription!:Subscription
  addCartSubscription!:Subscription
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:2500,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  }
  ngOnInit(): void {
    this.activeRouteSubscription = this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.productId = params.get('p_id')
      }
    })
    this.getProductSubscription = this._ProductsService.getSpecificProduct(this.productId).subscribe({
      next:(res)=>{
        this.productDetails = res.data 
      }
    })
  }

  ngOnDestroy(): void {
    this.activeRouteSubscription?.unsubscribe(),
    this.getProductSubscription?.unsubscribe(),
    this.addCartSubscription?.unsubscribe()
  }

  addItemToCart(productId:string){
    this.addCartSubscription = this._CartService.AddProductToCart(productId).subscribe({
      next:(res)=>{
        this._CartService.numCartItemsSubject.next(res.numOfCartItems)
        this._ToastrService.success(res.message,"Fresh Cart",{closeButton:true,timeOut:2000})
      }
    })
  }
}
