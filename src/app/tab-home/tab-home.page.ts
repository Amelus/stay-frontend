// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ActivationComponent} from "../components/activation/activation.component";
import {UserVm} from "../api/user/UserVm";
import {UserVmRole} from "../api/user/UserVmRole";
import {UserClient} from "../api/user/UserClient";

@Component({
  selector: 'app-tab-home',
  templateUrl: 'tab-home.page.html',
  styleUrls: ['tab-home.page.scss']
})
export class TabHomePage implements OnInit {

  currentUser: UserVm;
  needsUpgrade: boolean = true;
  stayInTouchLink: string[];

  constructor(public modalController: ModalController,
              private userClient: UserClient) {
  }

  ngOnInit(): void {
    this.initUser();
  }

  async showActivation() {
    if (this.needsUpgrade) {
      const eventView = await this.modalController.create(
        {
          component: ActivationComponent,
          cssClass: 'activation-component .modal-wrapper'
        }
      );
      await eventView.present();
    }
  }

  private initUser() {
    this.currentUser = this.userClient.getSessionUser();
    if (this.currentUser !== null) {
      this.needsUpgrade = this.currentUser.role === UserVmRole.User && this.currentUser.activated !== true;
      if (this.currentUser.role === UserVmRole.Admin) {
        this.stayInTouchLink = ['/stay-in-touch-admin'];
      } else {
        this.stayInTouchLink = ['/stay-in-touch'];
      }
    }
  }
}
