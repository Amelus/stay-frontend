import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from "@ionic/angular";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserClient} from "../../../api/user/UserClient";
import {ManagementClient} from "../../../api/management/ManagementClient";
import {CardVm} from "../../../api/card/CardVm";
import {ManagementVm} from "../../../api/management/ManagementVm";
import {UserVmRole} from "../../../api/user/UserVmRole";

@Component({
  selector: 'app-management-create',
  templateUrl: './management-create.component.html',
  styleUrls: ['./management-create.component.scss'],
})
export class ManagementCreateComponent implements OnInit {

  form: FormGroup;
  userRoles = UserVmRole;

  constructor(public modalController: ModalController,
              public toastController: ToastController,
              private formBuilder: FormBuilder,
              private userClient: UserClient,
              private managementClient: ManagementClient) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      forename: [''],
      surename: [''],
      role: [this.userRoles.User],
      email: [''],
    })
  }

  onSubmit() {
    let managementLocal: ManagementVm = new ManagementVm(this.form.value);

    // managementLocal.id = Math.floor(Math.random() * 100000); // TODO: solve this later with randomInt or somehow other way

    this.managementClient.testAddOneManagement(managementLocal);

    this.dismiss();

    this.presentToast();
  }

  public async dismiss() {
    await this.modalController.dismiss({
      dismissed: true
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Management erfolgreich erstellt!',
      duration: 2000
    });

    toast.present();
  }

}
