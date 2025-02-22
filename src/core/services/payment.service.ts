import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private _HttpClient :HttpClient) { }
  checkoutSession(cartId:string|null,formData:object):Observable<any>{
    console.log(cartId);
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environment.url}`,{"shippingAddress":formData})    
  }
  getUserOrders(user_id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${user_id}`)
  }
  createCashOrder(cartId:string|null , formData:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/${cartId}`,{"shippingAddress":formData})
  }
}

