import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserClient} from "../api/user/UserClient";
import {UserVmRole} from "../api/user/UserVmRole";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router,
              private userclient: UserClient) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // make check for token
    let sessionUser = this.userclient.getSessionUser();
    if (sessionUser !== null && sessionUser.role === UserVmRole.Admin) {
      return true;
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
