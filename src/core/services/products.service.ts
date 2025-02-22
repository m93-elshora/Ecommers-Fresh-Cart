import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _HttpClient : HttpClient) { }
  // getAllProducts():Observable<any>{
  //   return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)
  // }
  getAllProducts(page: number, limit: number): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?page=${page}&limit=${limit}`);
  }
  
  getSpecificProduct(pId:string|null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${pId}`)
  }
  
}



