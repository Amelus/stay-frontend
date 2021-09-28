import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalController, ToastController} from "@ionic/angular";
import {UserClient} from "../../../api/user/UserClient";
import {CardClient} from "../../../api/card/CardClient";
import {Router} from "@angular/router";
import {CardVm} from "../../../api/card/CardVm";

@Component({
  selector: 'app-cards-create',
  templateUrl: './cards-create.component.html',
  styleUrls: ['./cards-create.component.scss'],
})
export class CardsCreateComponent implements OnInit {

  form: FormGroup;

  constructor(public modalController: ModalController,
              public toastController: ToastController,
              private formBuilder: FormBuilder,
              private userClient: UserClient,
              private cardClient: CardClient,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    let cardLocal: CardVm = new CardVm(this.form.value);

    cardLocal.id = Math.floor(Math.random() * 100000); // TODO: solve this later with randomInt or somehow other way

    this.cardClient.testAddOneCard(cardLocal);

    this.dismiss();

    this.presentToast();
  }

  public async dismiss() {
    await this.modalController.dismiss({
      dismissed: true
    });
  }

  private initForm() {
    this.form = this.formBuilder.group({
      srcpath: [''],
      subtitle: [''],
      title: [''],
      content: [''],
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Karte erfolgreich erstellt!',
      duration: 2000
    });

    toast.present();
  }
}
