import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { NgClass, NgFor } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgClass, RouterLink, FormsModule, SearchPipe],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  productsData: IProduct[] = [];
  wishlist: IProduct[] = [];
  searchKey: string = '';
  currentPage: number = 1;
  numberOfPages!: number  ;
  limit!: number ; 
  pages!: number[] ; 
  removeProductFromWishlistSub!:Subscription
  addProductToWishlistSub!:Subscription
  addItemSub!:Subscription
  productSub!:Subscription
  favSub!:Subscription
  constructor(private _ProductsService: ProductsService,private _CartService: CartService,private _ToastrService: ToastrService,private _WishlistService: WishlistService) {}

  ngOnInit(): void {
    this.fetchProducts(this.currentPage);
    this.favSub = this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishlist = res.data;
      },
    });
  }

  fetchProducts(page: number): void {
     this.productSub = this._ProductsService.getAllProducts(page, this.limit).subscribe({
        next: (res) => {
          this.productsData = res.data;          
          this.currentPage = res.metadata.currentPage;
          this.numberOfPages = res.metadata.numberOfPages;
          this.pages = Array.from({ length: this.numberOfPages }, (_, i) => i + 1);
        },
      });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.numberOfPages) {
      this.fetchProducts(page);
    }
  }

  ngOnDestroy(): void {
    this.removeProductFromWishlistSub?.unsubscribe(),
    this.addItemSub?.unsubscribe(),
    this.productSub?.unsubscribe(),
    this.favSub?.unsubscribe(),
    this.addProductToWishlistSub?.unsubscribe()
  }

  addItemToCart(productId: string) {
     this.addItemSub = this._CartService.AddProductToCart(productId).subscribe({
      next: (res) => {
        this._CartService.numCartItemsSubject.next(res.numOfCartItems);
        this._ToastrService.success(res.message, 'Fresh Cart', { closeButton: true, timeOut: 2000 });
      },
    });
  }

  isInWishlist(productId: string): boolean {
    return this.wishlist.some((item) => item._id === productId);
  }
  
  toggleWishlist(product: IProduct): void {
      if (this.isInWishlist(product._id)) {
        this.removeProductFromWishlistSub = this._WishlistService.removeProductFromWishlist(product._id).subscribe({
          next: () => {
            this.wishlist = this.wishlist.filter(item => item._id !== product._id);
            this._ToastrService.error('Removed from Wishlist', 'Fresh Cart', { closeButton: true, timeOut: 2000 });
          }
        });
      } else {
        this.addProductToWishlistSub = this._WishlistService.addProductToWishlist(product._id).subscribe({
          next: () => {
            this.wishlist.push(product);
            this._ToastrService.success('Added to Wishlist', 'Fresh Cart', { closeButton: true, timeOut: 2000 });
          }
        });
      }
  }
}
