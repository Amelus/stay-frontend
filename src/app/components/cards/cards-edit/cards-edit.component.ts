import {Component, OnInit} from '@angular/core';
import {ModalController, ToastController} from "@ionic/angular";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserClient} from "../../../api/user/UserClient";
import {Router} from "@angular/router";
import {CardVm} from "../../../api/card/CardVm";

@Component({
  selector: 'app-cards-edit',
  templateUrl: './cards-edit.component.html',
  styleUrls: ['./cards-edit.component.scss'],
})
export class CardsEditComponent implements OnInit {

  form: FormGroup;
  card: CardVm;

  constructor(public modalController: ModalController,
              public toastController: ToastController,
              private formBuilder: FormBuilder,
              private userClient: UserClient,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.card.srcpath = this.form.controls['srcpath'].value;
    this.card.subtitle = this.form.controls['subtitle'].value;
    this.card.title = this.form.controls['title'].value;
    this.card.content = this.form.controls['content'].value;

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
      srcpath: [this.card.srcpath],
      subtitle: [this.card.subtitle],
      title: [this.card.title],
      content: [this.card.content],
    })
  }

  // private displayValidationErrors() {
  //   const formKeys = Object.keys(this.form.controls);
  //   formKeys.forEach(key => {
  //     this.form.controls[key].markAsDirty();
  //     this.form.controls[key].updateValueAndValidity();
  //   });
  // }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Änderung erfolgreich gespeicher!',
      duration: 2000
    });

    toast.present();
  }
}
