import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css'
})
export class NavMainComponent implements OnInit ,OnDestroy {
  numCartItems!: number;
  cartCountSubscription!:Subscription
  loggedCartSubscription!:Subscription
  constructor(private _Router:Router,private _CartService:CartService){}
  logout():void{
    sessionStorage.removeItem('token')
    this._Router.navigate(['/login'])
  }
  ngOnInit(): void {
    this.loggedCartSubscription = this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{this.numCartItems = res.numOfCartItems
      },
    })
    this.cartCountSubscription=this._CartService.numCartItemsSubject.subscribe({
      next:(value)=>{
        this.numCartItems=value
      }
    })
  }
  ngOnDestroy(): void {
    this.cartCountSubscription?.unsubscribe()
    this.loggedCartSubscription?.unsubscribe()
  }
}
