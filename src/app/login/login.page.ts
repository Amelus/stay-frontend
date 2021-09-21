// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserClient} from "../api/user/UserClient";
import {LoginVm} from "../api/login/LoginVm";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  returnUrl: string;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private userClient: UserClient,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.userClient.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    //this.loading = true;
    if (this.form.invalid) {
      this.displayValidationErrors();
      return;
    }

    const loginVm: LoginVm = new LoginVm(this.form.value);
    /*
    this.userClient.login(loginVm)
      .subscribe((data: LoginResponseVm) => {
        console.log(data);
        this.router.navigateByUrl(this.returnUrl);
      }, (err: ApiException) => {
        console.log(err);
        this.loading = false;
      });*/
    this.userClient.testLogin(loginVm);
    this.form.reset();
    this.router.navigateByUrl(this.returnUrl);
  }

  private initForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  private emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailRegex: RegExp = new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+');
      const valid = emailRegex.test(control.value);
      return valid ? null : {emailValid: {value: control.value}};
    };
  }

  private displayValidationErrors() {
    const formKeys = Object.keys(this.form.controls);
    formKeys.forEach(key => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
  }

}
