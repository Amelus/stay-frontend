// @ts-ignore
import {Component} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ActivationComponent} from "../components/activation/activation.component";

@Component({
  selector: 'app-tab-home',
  templateUrl: 'tab-home.page.html',
  styleUrls: ['tab-home.page.scss']
})
export class TabHomePage {

  constructor(public modalController: ModalController) {
  }

  async showActivation() {
    const eventView = await this.modalController.create(
      {
        component: ActivationComponent,
        cssClass: 'activation-component .modal-wrapper'
      }
    );
    await eventView.present();
  }
}
