import {Component, OnInit} from '@angular/core';
import {UserClient} from "../api/user/UserClient";
import {UserVm} from "../api/user/UserVm";
import {UserVmRole} from "../api/user/UserVmRole";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  currentUser: UserVm;
  isAdmin: boolean;
  isActivated: boolean;

  constructor(private userClient: UserClient) {
  }

  ngOnInit(): void {
    this.initUser();
  }

  initUser() {
    this.currentUser = this.userClient.getSessionUser();
    if (this.currentUser !== null) {
      this.isAdmin = this.currentUser.role === UserVmRole.Admin;
      this.isActivated = this.currentUser.activated === true;
    } else {
      this.isAdmin = false;
      this.isActivated = false;
    }
  }

}
