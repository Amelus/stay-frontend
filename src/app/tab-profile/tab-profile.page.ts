// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {UserVm} from "../api/user/UserVm";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {UserClient} from "../api/user/UserClient";
import {UserVmRole} from "../api/user/UserVmRole";
import {UpdateUserVm} from "../api/user/UpdateUserVm";


@Component({
  selector: 'app-tab-profile',
  templateUrl: 'tab-profile.page.html',
  styleUrls: ['tab-profile.page.scss']
})
export class TabProfilePage implements OnInit {
  form: FormGroup;
  currentUser: UserVm;
  profilePicture: string;
  needsUpgrade: boolean;

  constructor(private formBuilder: FormBuilder,
              private userClient: UserClient,
              private alertController: AlertController,
              private router: Router) {}

  ngOnInit() {
    this.initForm();
    this.initUser();
  }

  submitPwdChange() {
    if (this.form.invalid) {
      this.displayValidationErrors();
      return;
    }

    if (this.form.dirty) {
      const userVm: UpdateUserVm = new UpdateUserVm(this.form.value);

      /*this.userClient.update(userVm)
        .pipe(catchError((err: ApiException) => throwError(err)))
        .subscribe((user: UpdateUserResponseVm) => {
          console.log(user);
          this.profilePicture = user.imageUrl;
          if (this.needsUpgrade === true && user.role !== UserVmRole.User) {
            this.presentUpgradeSuccess();
          }
          this.needsUpgrade = user.role === UserVmRole.User;
        }, (err: ApiException) => {
          console.log(err);
        });*/

      this.userClient.testActivateUser(userVm.upgradeCode);
      this.form.reset();
      this.presentUpgradeSuccess();

    } else {
      console.log('Nothing to change');
    }
  }

  openChangeImg() {

  }

  private initForm() {
    this.form = this.formBuilder.group({
      oldPassword: [''],
      newPassword: ['', [Validators.minLength(8), this.oldPwdSetValidator]],
      confirmPassword: ['', [Validators.minLength(8), this.equalityValidator]],
      upgradeCode: [''],
      imageUrl: ['']
    });
  }

  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Sicher dass Sie sich ausloggen möchten?',
      buttons: [
        {
          text: 'Ja',
          cssClass: 'primary',
          handler: () => {
            this.userClient.logout();
            this.router.navigate(['/login'])
          }
        },
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary'
        }
      ]
    });
    await alert.present();
  }

  private displayValidationErrors() {
    const formKeys = Object.keys(this.form.controls);
    formKeys.forEach(key => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
  }

  private initUser() {
    this.currentUser = this.userClient.getSessionUser();
    /*if (this.currentUser.imageUrl) { set User Image
      this.profilePicture = this.currentUser.imageUrl;
    }*/
    this.needsUpgrade = this.currentUser.role === UserVmRole.User && this.currentUser.activated !== true;
  }

  private oldPwdSetValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.form.get('newPassword')) {
        return null;
      } else {
        return {oldPwdSet: {value: control.value}};
      }
    };
  }

  private equalityValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value === this.form.get('newPassword')) {
        return null;
      } else {
        return {inequality: {value: control.value}};
      }
    };
  }

  private async presentUpgradeSuccess() {
    const alert = await this.alertController.create({
      header: 'Aktualisieren erfolgreich',
      message: 'Ihr Account wurde erfolgreich aktualisiert',
      buttons: [
        {
          text: 'OK',
          cssClass: 'primary',
          handler: () => {
            /*this.userClient.logout();
            this.router.navigate(['/login']);
            For Testing redirect to start
            */
            this.router.navigate([''])
          }
        }
      ]
    });
    await alert.present();
  }
}
