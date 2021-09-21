import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserClient} from "../../../api/user/UserClient";
import {Router} from "@angular/router";
import {CardVm} from "../../../api/card/CardVm";
import {CardClient} from "../../../api/card/CardClient";

@Component({
  selector: 'app-cards-edit',
  templateUrl: './cards-edit.component.html',
  styleUrls: ['./cards-edit.component.scss'],
})
export class CardsEditComponent implements OnInit {

  form: FormGroup;
  card: CardVm;

  constructor(public modalController: ModalController,
              private formBuilder: FormBuilder,
              private userClient: UserClient,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    // TODO: remove this crap later
    // let ctrlSrcpath: AbstractControl = this.form.controls['srcpath'];
    //
    // if (ctrlSrcpath.touched) {
    //   alert("ctrlSrcpath: "+JSON.stringify(_.pick(ctrlSrcpath, ['touched', 'pristine', '_pendingValue', 'value', 'status', 'errors'])));
    // }
    //
    // if (this.form.controls['subtitle'].touched) {
    //   alert("subtitle was touched!");
    // }
    // if (this.form.controls['title'].touched) {
    //   alert("title was touched!");
    // }
    // if (this.form.controls['content'].touched) {
    //   alert("content was touched!");
    // }
    this.card.srcpath = this.form.controls['srcpath'].value;
    this.card.subtitle = this.form.controls['subtitle'].value;
    this.card.title = this.form.controls['title'].value;
    this.card.content = this.form.controls['content'].value;

    this.dismiss();
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

  private displayValidationErrors() {
    const formKeys = Object.keys(this.form.controls);
    formKeys.forEach(key => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
  }
}
