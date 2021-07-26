// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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

  private initForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    this.loading = true;
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
    this.userClient.setSessionUserTest(loginVm);
    this.router.navigateByUrl(this.returnUrl);
  }

  private displayValidationErrors() {
    const formKeys = Object.keys(this.form.controls);
    formKeys.forEach(key => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
  }

}
