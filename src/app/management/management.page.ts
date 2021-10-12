import { Component, OnInit } from '@angular/core';
import {UserClient} from "../api/user/UserClient";
import {ManagementVm} from "../api/management/ManagementVm";
import {UserVmRole} from "../api/user/UserVmRole";
import {UserVm} from "../api/user/UserVm";
import {ManagementClient} from "../api/management/ManagementClient";
import {AlertController, ModalController, ToastController} from "@ionic/angular";
import {CardClient} from "../api/card/CardClient";
import {Router} from "@angular/router";
import {CardsCreateComponent} from "../components/cards/cards-create/cards-create.component";
import {ManagementCreateComponent} from "../components/management/management-create/management-create.component";
import {CardsEditComponent} from "../components/cards/cards-edit/cards-edit.component";
import {ManagementEditComponent} from "../components/management/management-edit/management-edit.component";

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
    public modalController: ModalController,
    public toastController: ToastController,
    private managementClient: ManagementClient,
    private userClient: UserClient,
    private cardClient: CardClient,
    private router: Router,
    private alertController: AlertController) {
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

  async onCreate() {
    if (this.currentUser === null) {
      await this.router.navigate(['/login']);
    } else {
      const eventView = await this.modalController.create(
        {
          component: ManagementCreateComponent,
          componentProps: {},
          cssClass: 'management-create-selection-modal-css .modal-wrapper',
        });

      eventView.onDidDismiss().then(() => {
        this.managements = this.managementClient.testGetUserManagement();
      });

      (await eventView).present();
    }
  }

  async onEdit(management: ManagementVm) {
    if (this.currentUser === null) {
      await this.router.navigate(['/login']);
    } else {
      const eventView = await this.modalController.create(
        {
          component: ManagementEditComponent,
          componentProps: {
            management: management,
          },
          cssClass: 'management-edit-selection-modal-css .modal-wrapper',
        });

      eventView.onDidDismiss().then(() => {
        this.managementClient.testSaveManagement(this.managements);
      });

      (await eventView).present();
    }
  }

  async onDelete(management: ManagementVm) {
    if (this.currentUser === null) {
      await this.router.navigate(['/login']);
    } else {
      const alert = await this.alertController.create({
        header: 'Delete Management',
        cssClass:'alert-props',
        subHeader: 'Delete a management',
        message: 'Do you really want to delete this management?',
        buttons:  [
          {
            text: 'Cancel',
            role: 'cancel',
          }, {
            text: 'OK',
            handler: () => {
              this.managementClient.testRemoveOneManagement(management);
              this.managements = this.managementClient.testGetUserManagement();
              this.presentToast();
            }
          }
        ]
      });

      await alert.present();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Managemenet erfolgreich gelöscht!',
      duration: 2000
    });

    toast.present();
  }
}
