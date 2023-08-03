import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  localStorageData: any;
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.localStorageData = localStorage.getItem('userData');
    if (JSON.parse(this.localStorageData)?.clgRole === 'hod') {
      console.log('auth', JSON.parse(this.localStorageData).clgRole);
      return true;
    }
    else {
      alert("Can't Access Dashboard without login..")
      // this.router.navigate(['/login']);
      return false;
    }
  }

}
