import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  decodedToken!:any
  constructor(private  _HttpClient:HttpClient) { }
  registerClient(userData:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,userData)
  }
  loginUser(userData:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,userData)
  }
  saveDecodedToken():void{
    if(sessionStorage.getItem('token') != null){
      return this.decodedToken = jwtDecode(sessionStorage.getItem('token')!)
      // console.log(this.decodedToken);
      
    }
  }
  forgetPassword(email:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,email)
  }
  verifyResetCode(code:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,{ resetCode: code })
  }
  resetPassword(resetData:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,resetData)
  }
}
