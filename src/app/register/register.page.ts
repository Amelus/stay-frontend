import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterVm} from "../api/register/RegisterVm";
import {UserClient} from "../api/user/UserClient";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userClient: UserClient) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.displayValidationErrors();
      return;
    }

    const registerVm: RegisterVm = new RegisterVm(this.form.value);
    /*
        this.userClient.register(registerVm)
        .pipe(catchError((err: ApiException) => throwError(err)))
        .subscribe((user: UserVm) => {
          console.log(user);
          this.router.navigate(['/login']);
        }, (err: ApiException) => {
          console.log(err);
        });
     */
    this.userClient.testRegister(registerVm);
    this.router.navigate(['/tabs/tab-profile']);
  }

  private ConfirmPasswordValidator(password: string, passwordRepeat: string) {
    return (group: FormGroup) => {
      let control = group.controls[password];
      let matchingControl = group.controls[passwordRepeat]
      if ( matchingControl.errors && !matchingControl.errors.confirmPasswordValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  private emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailRegex: RegExp = new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+');
      const valid = emailRegex.test(control.value);
      return valid ? null : {emailValid: {value: control.value}};
    };
  }

  private charsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const smallChars: RegExp = new RegExp('^[a-zA-ZÀ-ž\\-]+$');
      const valid = smallChars.test(control.value);
      return valid ? null : {charactersOnly: {value: control.value}};
    };
  }

  private initForm() {
    this.form = this.formBuilder.group({
        email: ['', [Validators.required, this.emailValidator()]],
        firstName: ['', [this.charsValidator()]],
        lastName: ['', [this.charsValidator()]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordRepeat: ['', [Validators.required]],
        activationCode: ['', Validators.minLength(8)]
      },
      {
        validator: this.ConfirmPasswordValidator("password", "passwordRepeat"),
      });
  }

  private displayValidationErrors() {
    const formKeys = Object.keys(this.form.controls);
    formKeys.forEach(key => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
  }

}
