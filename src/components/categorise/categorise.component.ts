import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/icategory';
import { CategoriesService } from './../../core/services/categories.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { ISubCategory } from '../../core/interfaces/isub-category';

@Component({
  selector: 'app-categorise',
  standalone: true,
  imports: [FormsModule,SearchPipe],
  templateUrl: './categorise.component.html',
  styleUrl: './categorise.component.css'
})
export class CategoriseComponent implements OnInit,OnDestroy{
  constructor(private _CategoriesService : CategoriesService,private _ToastrService:ToastrService){}
  categoryData:ICategory[]|null = null
  categorySubscription!:Subscription
  subCategorySubscription!:Subscription
  searchKey:string=''
  subCategoryData!:ISubCategory[]
  isLoadingSubCategories: boolean = false; 
  ngOnInit(): void {
    this.categorySubscription = this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoryData=res.data;
      }
    })
  }
  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe()
    this.subCategorySubscription?.unsubscribe()
  }
  showAllSubCategories(id:string):void{
    this.isLoadingSubCategories = true
    this.subCategoryData = []; 
    this.subCategorySubscription = this._CategoriesService.getAllSubCategories(id).subscribe({
      next:(res)=>{
        this.subCategoryData = res.data
        this.isLoadingSubCategories=false
      }
    })
  }
  
}
