// @ts-ignore
import {Inject, Injectable, Optional} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse, HttpResponseBase} from "@angular/common/http";
import {Observable, of as _observableOf, Subscription} from "rxjs";
import {mergeMap as _observableMergeMap} from "rxjs/operators";
import {catchError as _observableCatch} from "rxjs/internal/operators/catchError";
import {throwError as _observableThrow} from "rxjs/internal/observable/throwError";

import {ApiException} from '../shared/exception/ApiException';
import {LoginResponseVm} from '../login/LoginResponseVm';
import {LoginVm} from '../login/LoginVm';
import {RegisterVm} from '../register/RegisterVm';
import {UpdateUserResponseVm} from './UpdateUserResponseVm';
import {UpdateUserVm} from './UpdateUserVm';
import {UserVm} from './UserVm';

import {API_BASE_URL, blobToText, throwException} from '../api';
import * as dayjs from 'dayjs'
import {UserVmRole} from "./UserVmRole";

@Injectable({
  providedIn: 'root'
})
export class UserClient {

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl ? baseUrl : 'http://localhost:8080/api';
  }

  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  private static setSession(loginResponseVm: LoginResponseVm) {
    const expiresAt = dayjs().add(Number(loginResponseVm.expiresIn), 'second');

    localStorage.setItem('id_token', loginResponseVm.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('user', JSON.stringify(loginResponseVm.user));
  }

  getSessionUser(): UserVm {
    const parsedUser = JSON.parse(localStorage.getItem('user'));
    if (parsedUser !== null) {
      return UserVm.fromJS(parsedUser);
    }
    return null;
  }

  updateSessionUserImage(imageUrl: string) {
    const sessionUser: UserVm = this.getSessionUser();
    sessionUser.imageUrl = imageUrl;
    localStorage.setItem('user', JSON.stringify(sessionUser));
  }

  refreshSessionUser(): Subscription {
    return this.getUser().subscribe((user: UserVm) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  getUser(): Observable<UserVm> {
    let url = this.baseUrl + '/user';
    url = url.replace(/[?&]$/, '');

    const options: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http.request('get', url, options).pipe(_observableMergeMap((response: any) => {
      return this.processGet(response);
    })).pipe(_observableCatch((response: any) => {
      if (response instanceof HttpResponseBase) {
        try {
          return this.processRegister(response as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<UserVm>;
        }
      } else {
        return _observableThrow(response) as any as Observable<UserVm>;
      }
    }));
  }

  protected processGet(response: HttpResponseBase): Observable<UserVm> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (response as any).error instanceof Blob ? (response as any).error : undefined;

    const headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) {
        headers[key] = response.headers.get(key);
      }
    }

    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(responseText => {
        let result200: any = null;
        const resultData200 = responseText === '' ? null : JSON.parse(responseText, this.jsonParseReviver);
        result200 = resultData200 ? UserVm.fromJS(resultData200) : new UserVm();
        return _observableOf(result200);
      }));
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(_observableMergeMap(responseText => {
        let result400: any = null;
        const resultData400 = responseText === '' ? null : JSON.parse(responseText, this.jsonParseReviver);
        result400 = resultData400 ? ApiException.fromJS(resultData400) : new ApiException();
        return throwException('A server error occurred.', status, responseText, headers, result400);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(responseText => {
        return throwException('An unexpected server error occurred.', status, responseText, headers);
      }));
    }
    return _observableOf<UserVm>(null as any);
  }

  register(registerVm: RegisterVm): Observable<UserVm> {
    let url = this.baseUrl + '/user/register';
    url = url.replace(/[?&]$/, '');

    const content = JSON.stringify(registerVm);

    const options: any = {
      body: content,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http.request('post', url, options).pipe(_observableMergeMap((response: any) => {
      return this.processRegister(response);
    })).pipe(_observableCatch((response: any) => {
      if (response instanceof HttpResponseBase) {
        try {
          return this.processRegister(response as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<UserVm>;
        }
      } else {
        return _observableThrow(response) as any as Observable<UserVm>;
      }
    }));
  }

  protected processRegister(response: HttpResponseBase): Observable<UserVm> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (response as any).error instanceof Blob ? (response as any).error : undefined;

    const headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) {
        headers[key] = response.headers.get(key);
      }
    }

    if (status === 201) {
      return blobToText(responseBlob).pipe(_observableMergeMap(responseText => {
        let result201: any = null;
        const resultData201 = responseText === '' ? null : JSON.parse(responseText, this.jsonParseReviver);
        result201 = resultData201 ? UserVm.fromJS(resultData201) : new UserVm();
        return _observableOf(result201);
      }));
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(_observableMergeMap(responseText => {
        let result400: any = null;
        const resultData400 = responseText === '' ? null : JSON.parse(responseText, this.jsonParseReviver);
        result400 = resultData400 ? ApiException.fromJS(resultData400) : new ApiException();
        return throwException('A server error occurred.', status, responseText, headers, result400);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(responseText => {
        return throwException('An unexpected server error occurred.', status, responseText, headers);
      }));
    }
    return _observableOf<UserVm>(null as any);
  }

  login(loginVm: LoginVm): Observable<LoginResponseVm> {
    let url = this.baseUrl + '/user/login';
    url = url.replace(/[?&]$/, '');

    const content = JSON.stringify(loginVm);

    const options: any = {
      body: content,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http.request('post', url, options).pipe(_observableMergeMap((response: any) => {
      return this.processLogin(response);
    })).pipe(_observableCatch((response: any) => {
      if (response instanceof HttpResponseBase) {
        try {
          return this.processLogin(response as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<LoginResponseVm>;
        }
      } else {
        return _observableThrow(response) as any as Observable<LoginResponseVm>;
      }
    }));
  }

  protected processLogin(response: HttpResponseBase): Observable<LoginResponseVm> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (response as any).error instanceof Blob ? (response as any).error : undefined;

    const headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) {
        headers[key] = response.headers.get(key);
      }
    }

    if (status === 201) {
      return blobToText(responseBlob).pipe(_observableMergeMap(responseText => {
        let result201: any = null;
        const resultData201 = responseText === '' ? null : JSON.parse(responseText, this.jsonParseReviver);
        result201 = resultData201 ? LoginResponseVm.fromJS(resultData201) : new LoginResponseVm();
        UserClient.setSession(result201);
        return _observableOf(result201);
      }));
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(_observableMergeMap(responseText => {
        let result400: any = null;
        const resultData400 = responseText === '' ? null : JSON.parse(responseText, this.jsonParseReviver);
        result400 = resultData400 ? ApiException.fromJS(resultData400) : new ApiException();
        return throwException('A server error occurred.', status, responseText, headers, result400);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(responseText => {
        return throwException('An unexpected server error occurred.', status, responseText, headers);
      }));
    }
    return _observableOf<LoginResponseVm>(null as any);
  }

  update(updateVm: UpdateUserVm): Observable<UpdateUserResponseVm> {
    let url = this.baseUrl + '/user/update';
    url = url.replace(/[?&]$/, '');

    const content = JSON.stringify(updateVm);

    const options: any = {
      body: content,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http.request('put', url, options).pipe(_observableMergeMap((response: any) => {
      return this.processUpdate(response);
    })).pipe(_observableCatch((response: any) => {
      if (response instanceof HttpResponseBase) {
        try {
          return this.processUpdate(response as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<UpdateUserResponseVm>;
        }
      } else {
        return _observableThrow(response) as any as Observable<UpdateUserResponseVm>;
      }
    }));
  }

  protected processUpdate(response: HttpResponseBase): Observable<UpdateUserResponseVm> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (response as any).error instanceof Blob ? (response as any).error : undefined;

    const headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) {
        headers[key] = response.headers.get(key);
      }
    }

    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(responseText => {
        let result200: any = null;
        const resultData200 = responseText === '' ? null : JSON.parse(responseText, this.jsonParseReviver);
        result200 = resultData200 ? UpdateUserResponseVm.fromJS(resultData200) : new UpdateUserResponseVm();
        return _observableOf(result200);
      }));
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(_observableMergeMap(responseText => {
        let result400: any = null;
        const resultData400 = responseText === '' ? null : JSON.parse(responseText, this.jsonParseReviver);
        result400 = resultData400 ? ApiException.fromJS(resultData400) : new ApiException();
        return throwException('A server error occurred.', status, responseText, headers, result400);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(responseText => {
        return throwException('An unexpected server error occurred.', status, responseText, headers);
      }));
    }
    return _observableOf<UpdateUserResponseVm>(null as any);
  }

  getAssignees(): Observable<UserVm[]> {
    let url = this.baseUrl + '/user/assignees';

    url = url.replace(/[?&]$/, '');

    const options: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http.request('get', url, options).pipe(_observableMergeMap((response: any) => {
      return this.processGetall(response);
    })).pipe(_observableCatch((response: any) => {
      if (response instanceof HttpResponseBase) {
        try {
          return this.processGetall(response as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<UserVm[]>;
        }
      } else {
        return _observableThrow(response) as any as Observable<UserVm[]>;
      }
    }));
  }

  testRegister(registerVm: RegisterVm) {
    let loginVm: LoginVm = new LoginVm();
    loginVm.username = registerVm.email;
    let hasActivation: boolean = registerVm.activationCode !== undefined;
    this.testLogin(loginVm, hasActivation);
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
  }

  public isLoggedIn() {
    return dayjs().isBefore(this.getTokenExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getTokenExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return dayjs(expiresAt);
  }

  testLogin(loginVm: LoginVm, activated: boolean = false) {
    const expiresAt = dayjs().add(Number(999999999999999), 'second');
    localStorage.setItem('id_token', "testtoken");
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    let user: UserVm = new UserVm();
    user.username = loginVm.username;
    if (loginVm.username !== 'admin') {
      user.role = UserVmRole.User;
      user.firstName = 'Max';
      user.lastName = 'Mustermann';
      if (loginVm.username === 'active' || activated) {
        user.activated = true;
      }
    } else {
      user.role = UserVmRole.Admin;
      user.firstName = 'Rolf';
      user.lastName = 'Kipp';
    }

    localStorage.setItem('user', JSON.stringify(user));
  }

  testActivateUser(activationCode: string): Observable<string> {
    let sessionUser: UserVm = this.getSessionUser();
    // dummy activation no Server request yet
    if (sessionUser !== null) {
      sessionUser.activated = true;
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(sessionUser));
      return _observableOf("SUCCESS")
    }

    let err: ApiException = new ApiException({error: 'User not logged in'});
    return _observableThrow(err);
  }

  protected processGetall(response: HttpResponseBase): Observable<UserVm[]> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (response as any).error instanceof Blob ? (response as any).error : undefined;

    const headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) {
        headers[key] = response.headers.get(key);
      }
    }

    if (status === 200) {
      return blobToText(responseBlob)
        .pipe(_observableMergeMap(responseText => {
          let result200: any = null;
          const resultData200 = responseText === '' ? null : JSON.parse(responseText, this.jsonParseReviver);
          if (resultData200 && resultData200.constructor === Array) {
            result200 = [];
            for (const item of resultData200) {
              result200.push(UserVm.fromJS(item));
            }
          }
          return _observableOf(result200);
        }));
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(_observableMergeMap(responseText => {
        let result400: any = null;
        const resultData400 = responseText === '' ? null : JSON.parse(responseText, this.jsonParseReviver);
        result400 = resultData400 ? ApiException.fromJS(resultData400) : new ApiException();
        return throwException('A server error occurred.', status, responseText, headers, result400);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(responseText => {
        return throwException('An unexpected server error occurred.', status, responseText, headers);
      }));
    }
    return _observableOf<UserVm[]>(null as any);
  }
}
