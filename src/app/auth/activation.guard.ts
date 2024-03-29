import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserClient} from "../api/user/UserClient";
import {Injectable} from "@angular/core";
import {UserVm} from "../api/user/UserVm";
import {UserVmRole} from "../api/user/UserVmRole";

@Injectable()
export class ActivationGuard implements CanActivate {
  constructor(private router: Router,
              private userClient: UserClient) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let sessionUser: UserVm = this.userClient.getSessionUser();
    // make check for token
    if (sessionUser !== null && (sessionUser.activated || sessionUser.role === UserVmRole.Admin)) {
      return true;
    }
    this.router.navigate([''], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
