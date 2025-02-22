import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ResetCodeGuard implements CanActivate {
  constructor(private _Router: Router) {}
  canActivate(): boolean {
    const confirmedEmail = sessionStorage.getItem('confirmedEmail');
    if (confirmedEmail) {
      return true;
    } else {
      this._Router.navigate(['/forgetPassword']);
      return false;
    }
  }
}
