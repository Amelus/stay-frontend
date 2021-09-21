import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserClient} from "../api/user/UserClient";
import {Injectable} from "@angular/core";
import {UserVm} from "../api/user/UserVm";

@Injectable()
export class ReverseActivationGuard implements CanActivate {
  constructor(private router: Router,
              private userClient: UserClient) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let sessionUser: UserVm = this.userClient.getSessionUser();
    // make check for token
    if (sessionUser === null || !sessionUser.activated) {
      return true;
    }
    this.router.navigate(['/tabs/start']);
    return false;
  }
}
