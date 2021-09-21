import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserClient} from "../../api/user/UserClient";
import {ApiException} from "../../api/shared/exception/ApiException";
import {throwError} from "rxjs";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss'],
})
export class ActivationComponent implements OnInit {

  form: FormGroup;

  constructor(public modalController: ModalController,
              private alertController: AlertController,
              private formBuilder: FormBuilder,
              private userClient: UserClient,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.displayValidationErrors();
      return;
    }

    const activationCode: string = this.form.value;
    this.userClient.testActivateUser(activationCode)
      .pipe(catchError((err: ApiException) => throwError(err)))
      .subscribe((response: string) => {
        console.log(response);
        this.presentUpgradeSuccess();
      }, (err: ApiException) => {
        this.presentUpgradeFailed(err.error);
      })
    this.dismiss();
  }

  public async dismiss() {
    await this.modalController.dismiss({
      dismissed: true
    });
  }

  private initForm() {
    this.form = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  private displayValidationErrors() {
    const formKeys = Object.keys(this.form.controls);
    formKeys.forEach(key => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
  }

  private async presentUpgradeSuccess() {
    const alert = await this.alertController.create({
      header: 'App erfolgreich freigeschalten',
      message: 'Ihr Account wurde erfolgreich aktiviert, Sie müssen sich nun erneut einloggen',
      buttons: [
        {
          text: 'OK',
          cssClass: 'primary',
          handler: () => {
            this.router.navigate(['/login'])
          }
        }
      ]
    });
    await alert.present();
  }

  private async presentUpgradeFailed(errorMsg: string) {
    const alert = await this.alertController.create({
      header: 'Aktivieren fehlgeschlagen',
      message: 'Fehler: ' + errorMsg,
      buttons: [
        {
          text: 'OK',
          cssClass: 'primary'
        }
      ]
    });
    await alert.present();
  }
}
