import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ModalController} from "@ionic/angular";
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
              private formBuilder: FormBuilder,
              private userClient: UserClient,
              private cardClient: CardClient,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit2() {
    let cardLocal: CardVm = new CardVm(this.form.value);

    cardLocal.id = Math.floor(Math.random() * 100000); // TODO: solve this later with randomInt or somehow other way

    this.cardClient.testAddOneCard(cardLocal);

    this.dismiss();
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
}
