import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {AuthenticationService} from '../_services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    isLoginAvailable = true;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            const authorized: boolean = this.authenticationService.userDataFromToken?.authorities?.includes(route.routeConfig?.data?.['role']) ?? false;
            if (route.routeConfig?.data?.['role'] !== '' && !authorized) {
                this.router.navigate(['/']);
                return false;
            } else {
                return true;
            }
        }
        if (this.isLoginAvailable) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }
}
