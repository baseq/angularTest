import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
    providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {

    constructor(private router: Router,
        private loginService: LoginService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const id = +next.url[0].path;
        if (this.loginService.isAdmin()) {
            if (isNaN(id) || id < 1) {
                alert('Invalid product Id');
                this.router.navigate(['/products']);
                return false;
            }
            return true;
        }
        return false;
    }
}
