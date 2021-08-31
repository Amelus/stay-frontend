import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
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
        this.router.navigate(['']);
      }, (err: ApiException) => {
        console.log(err);
      })
  }

  public async dismiss() {
    await this.modalController.dismiss({
      dismissed: true
    });
  }

  private initForm() {
    this.form = this.formBuilder.group({
      code: ['', Validators.required, Validators.minLength(8)]
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
