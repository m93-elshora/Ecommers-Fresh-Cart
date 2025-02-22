
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  numCartItemsSubject:BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient) {
  }
  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  AddProductToCart(p_id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,{ productId: p_id })
  }

  removeSpecificCartItem(p_id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${p_id}`)
  }

  updateCartProductQuantity(p_id: string, count: number): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${p_id}`, { count: count })
  }

  clearUserCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }

}
