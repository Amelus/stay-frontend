import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterVm} from "../api/register/RegisterVm";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }


  private initForm() {
    this.form = this.formBuilder.group({
      registrationCode: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(4), this.smallCharsValidator()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', [Validators.required, this.charsValidator()]],
      lastName: ['', [Validators.required, this.charsValidator()]],
    });
  }

  private smallCharsValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const smallChars: RegExp = new RegExp('^[a-z0-9_\\-]+$');
      const valid = smallChars.test(control.value);
      return valid ? null : {smallCharactersOnly: {value: control.value}};
    };
  }

  private charsValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const smallChars: RegExp = new RegExp('^[a-zA-ZÀ-ž\\-]+$');
      const valid = smallChars.test(control.value);
      return valid ? null : {charactersOnly: {value: control.value}};
    };
  }

  onSubmit() {
    if (this.form.invalid) {
      this.displayValidationErrors();
      return;
    }

    alert('Registration Valid');
    const registerVm: RegisterVm = new RegisterVm(this.form.value);
  }

  private displayValidationErrors() {
    const formKeys = Object.keys(this.form.controls);
    formKeys.forEach(key => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
  }
}
