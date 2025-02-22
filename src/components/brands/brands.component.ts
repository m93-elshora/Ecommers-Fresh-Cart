import { error } from 'console';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';
import { IBrand } from '../../core/interfaces/ibrand';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [SearchPipe,FormsModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit , OnDestroy {
  constructor(private  _BrandsService : BrandsService,private _ToastrService:ToastrService){}
  brandSubscription!:Subscription
  brandsData:IBrand[] | null = null
  searchKey:string=''
  currentPage: number = 1;
  numberOfPages!: number  ;
  limit!: number ; 
  pages!: number[] ; 

  ngOnInit(): void {
    this.fetchBrands(this.currentPage);
  }
  ngOnDestroy(): void {
    this.brandSubscription?.unsubscribe()
  }
  fetchBrands(page: number): void {
    this.brandSubscription=this._BrandsService.showAllBrands(page, this.limit).subscribe({
       next: (res) => {
         this.brandsData = res.data;
         this.currentPage = res.metadata.currentPage;
         this.numberOfPages = res.metadata.numberOfPages;
         this.pages = Array.from({ length: this.numberOfPages }, (_, i) => i + 1);
       },
     });
 }
 goToPage(page: number): void {
  if (page >= 1 && page <= this.numberOfPages) {
    this.fetchBrands(page);
  }
}
}
