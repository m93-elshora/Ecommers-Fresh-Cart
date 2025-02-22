import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule , FormsModule , ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , OnDestroy{
  categoryData!:ICategory[]
  categoriesSub!:Subscription
  searchKey:string=''
  constructor( private _CategoriesService :CategoriesService ){}
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: false,
    items:1
  }
  categorySlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      200: {
        items: 1
      },
      400: {
        items: 3
      },
      300: {
        items: 3
      },
      600: {
        items: 3
      },
      740: {
        items: 4
      },
      900: {
        items: 5
      },
      1000: {
        items: 6
      },
      1100:{
        items:7
      }
    },
    nav: false
  }
  ngOnInit(): void {
    this.categoriesSub=this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoryData = res.data 
      }
    })
  }
  ngOnDestroy(): void {
    this.categoriesSub?.unsubscribe()
  }
}
