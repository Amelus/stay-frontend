// @ts-ignore
import {ApplicationRef, Component, OnInit} from '@angular/core';
import {UserVm} from "../api/user/UserVm";
import {UserClient} from "../api/user/UserClient";
import {CardVm} from "../api/card/CardVm";
import {AlertController, ModalController} from "@ionic/angular";
import {Router} from "@angular/router";
import {CardClient} from "../api/card/CardClient";
import {CardsEditComponent} from "../components/cards/cards-edit/cards-edit.component";
import {CardsCreateComponent} from "../components/cards/cards-create/cards-create.component";
import {UserVmRole} from "../api/user/UserVmRole";

@Component({
  selector: 'app-stay-informed',
  templateUrl: './stay-informed.page.html',
  styleUrls: ['./stay-informed.page.scss'],
})
export class StayInformedPage implements OnInit {
  currentUser: UserVm;
  isAdmin: boolean = false;
  isEdit: boolean;

  colorEditButtonOff: string;
  colorEditButtonOn: string;
  currentEditColor: string;

  cards: CardVm[];

  constructor(public modalController: ModalController,
              private userClient: UserClient,
              private cardClient: CardClient,
              private router: Router,
              private alertController: AlertController,
              private app: ApplicationRef) {
  }

  ngOnInit() {
    this.colorEditButtonOff = '#00FF00';
    this.colorEditButtonOn = '#FF0000';
    this.currentEditColor = this.colorEditButtonOn;

    this.isEdit = false;

    this.initUser();
  }

  private initUser() {
    this.currentUser = this.userClient.getSessionUser();
    if (this.currentUser !== null) {
      this.isAdmin = this.currentUser.role === UserVmRole.Admin;
    }

    this.cards = this.cardClient.testGetUserCards();
  }

  private toggleEdit(event: Event) {
    this.isEdit = !this.isEdit;
    // const x = document.getElementById('editButton').children[0];   // Get the element with id="demo"
    if (this.isEdit) {
      this.currentEditColor = this.colorEditButtonOn;
    } else {
      this.currentEditColor = this.colorEditButtonOff;
    }
  }

  async onAddCard() {
    if (this.currentUser === null) {
      await this.router.navigate(['/login']);
    } else {
      const eventView = await this.modalController.create(
        {
          component: CardsCreateComponent,
          componentProps: {},
          cssClass: 'card-edit-selection-modal-css .modal-wrapper',
        });

      eventView.onDidDismiss().then(() => {
        this.cards = this.cardClient.testGetUserCards();
      });

      (await eventView).present();
    }
  }

  async onEditCard(card: CardVm) {
    if (this.currentUser === null) {
      await this.router.navigate(['/login']);
    } else {
      const eventView = await this.modalController.create(
        {
          component: CardsEditComponent,
          componentProps: {
            card: card,
          },
          cssClass: 'card-edit-selection-modal-css .modal-wrapper',
        });

      eventView.onDidDismiss().then(() => {
        this.cardClient.testSaveCards(this.cards);
      });

      (await eventView).present();
    }
  }

  async onDeleteCard(card: CardVm) {
    if (this.currentUser === null) {
      await this.router.navigate(['/login']);
    } else {
      const alert = await this.alertController.create({
        header: 'Delete Card',
        cssClass:'alert-props',
        subHeader: 'Delete a card',
        message: 'Do you really want to delete this card?',
        buttons:  [
          {
            text: 'Cancel',
            role: 'cancel',
          }, {
            text: 'OK',
            handler: () => {
              this.cardClient.testRemoveOneCard(card);
              this.cards = this.cardClient.testGetUserCards();
            }
          }
        ]
      });

      await alert.present();
    }
  }
}
