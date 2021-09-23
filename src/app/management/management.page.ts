import { Component, OnInit } from '@angular/core';
import {UserClient} from "../api/user/UserClient";
import {ManagementVm} from "../api/management/ManagementVm";
import {UserVmRole} from "../api/user/UserVmRole";
import {UserVm} from "../api/user/UserVm";
import {ManagementClient} from "../api/management/ManagementClient";

@Component({
  selector: 'app-management',
  templateUrl: './management.page.html',
  styleUrls: ['./management.page.scss'],
})
export class ManagementPage implements OnInit {

  currentUser: UserVm;
  isAdmin: boolean;
  managements: ManagementVm[];

  constructor(
    private userClient: UserClient,
    private managementClient: ManagementClient) {
  }

  ngOnInit() {
    this.initUser();
  }

  private initUser() {
    this.currentUser = this.userClient.getSessionUser();
    if (this.currentUser !== null) {
      this.isAdmin = this.currentUser.role === UserVmRole.Admin;
    }

    this.managements = this.managementClient.testGetUserManagement();
  }

  private onEdit(management: ManagementVm) {
    // TODO: finish this!
    management.forename += 'a'; // only for testing purposes
    alert('management: ' + JSON.stringify(management));
  }

  private onDelete(management: ManagementVm) {
    // TODO: finish this!
  }

  private onCreate() {
    // TODO: finish this!
  }

}
