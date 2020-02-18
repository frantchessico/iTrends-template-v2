import { auth } from 'firebase/app';
import { take, map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from "util";

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {
  constructor(private afsAuth: AngularFireAuth, private router: Router ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.afsAuth.authState.pipe(
      map(auth => {
        if (isNullOrUndefined(auth)) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      }));
  }
}
