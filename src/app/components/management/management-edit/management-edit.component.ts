import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from "@ionic/angular";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserClient} from "../../../api/user/UserClient";
import {ManagementClient} from "../../../api/management/ManagementClient";
import {UserVmRole} from "../../../api/user/UserVmRole";
import {ManagementVm} from "../../../api/management/ManagementVm";

@Component({
  selector: 'app-management-edit',
  templateUrl: './management-edit.component.html',
  styleUrls: ['./management-edit.component.scss'],
})
export class ManagementEditComponent implements OnInit {

  form: FormGroup;
  management: ManagementVm;
  userRoles = UserVmRole;

  constructor(public modalController: ModalController,
              public toastController: ToastController,
              private formBuilder: FormBuilder,
              private userClient: UserClient,
              private managementClient: ManagementClient) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.management.forename = this.form.controls['forename'].value;
    this.management.surename = this.form.controls['surename'].value;
    this.management.role = this.form.controls['role'].value;
    this.management.email = this.form.controls['email'].value;

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
      forename: [this.management.forename],
      surename: [this.management.surename],
      role: [this.management.role],
      email: [this.management.email],
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
