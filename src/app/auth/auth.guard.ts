import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserClient} from "../api/user/UserClient";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private userclient: UserClient) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // make check for token
    if (this.userclient.getSessionUser() !== null) {
      return true;
    }
    this.router.navigate(['/login'],  { queryParams: { returnUrl: state.url }});
    return false;
  }
}
