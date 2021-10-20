import {catchError as _observableCatch, mergeMap as _observableMergeMap} from 'rxjs/operators';
import {Observable, of as _observableOf, throwError as _observableThrow} from 'rxjs';
import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse, HttpResponseBase} from '@angular/common/http';

import {AppointmentParams} from "./AppointmentParams";
import {AppointmentVm} from "./AppointmentVm";

import {ApiException} from "../shared/exception/ApiException";

import {API_BASE_URL, blobToText, throwException,} from '../api';
import {AppointmentType} from "./AppointmentType";

@Injectable({
  providedIn: 'root'
})
export class AppointmentClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl ? baseUrl : 'http://localhost:8080/api';
  }

  create(appointmentParams: AppointmentParams): Observable<AppointmentVm> {
    let url = this.baseUrl + '/appointment';
    url = url.replace(/[?&]$/, '');

    const content = JSON.stringify(appointmentParams);

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
      return this.processCreate(response);
    })).pipe(_observableCatch((response: any) => {
      if (response instanceof HttpResponseBase) {
        try {
          return this.processCreate(response as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<AppointmentVm>;
        }
      } else {
        return _observableThrow(response) as any as Observable<AppointmentVm>;
      }
    }));
  }

  getAll(): Observable<AppointmentVm[]> {
    let url = this.baseUrl + '/appointment';

    url = url.replace(/[?&]$/, '');

    const options: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http.request('get', url, options).pipe(_observableMergeMap((response: any) => {
      return this.processGetAll(response);
    })).pipe(_observableCatch((response: any) => {
      if (response instanceof HttpResponseBase) {
        try {
          return this.processGetAll(response as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<AppointmentVm[]>;
        }
      } else {
        return _observableThrow(response) as any as Observable<AppointmentVm[]>;
      }
    }));
  }

  testGetAll(): Observable<AppointmentVm[]> {
    let appointments: AppointmentVm[] = [];
    let appointment1: AppointmentVm = new AppointmentVm();
    appointment1.type = AppointmentType.F2F;
    appointment1.date = new Date(2021, 10, 21, 14, 0);
    appointment1.available = true;

    let appointment2: AppointmentVm = new AppointmentVm();
    appointment2.type = AppointmentType.F2F;
    appointment2.date = new Date(2021, 10, 21, 17, 30);
    appointment2.available = true;

    let appointment3: AppointmentVm = new AppointmentVm();
    appointment3.type = AppointmentType.WEBINAR;
    appointment3.date = new Date(2021, 10, 22, 12, 0);
    appointment3.available = false;

    let appointment4: AppointmentVm = new AppointmentVm();
    appointment1.type = AppointmentType.WEBINAR;
    appointment1.date = new Date(2021, 10, 25, 13, 0);
    appointment1.available = true;

    appointments.push(appointment1);
    appointments.push(appointment2);
    appointments.push(appointment3);
    appointments.push(appointment4);

    return _observableOf(appointments);
  }

  protected processCreate(response: HttpResponseBase): Observable<AppointmentVm> {
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
        result201 = resultData201 ? AppointmentVm.fromJSON(resultData201) : new AppointmentVm();
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
    return _observableOf<AppointmentVm>(null as any);
  }

  update(appointmentVm: AppointmentVm): Observable<AppointmentVm> {
    let url = this.baseUrl + '/appointment';
    url = url.replace(/[?&]$/, '');

    const content = JSON.stringify(appointmentVm);

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
          return _observableThrow(e) as any as Observable<AppointmentVm>;
        }
      } else {
        return _observableThrow(response) as any as Observable<AppointmentVm>;
      }
    }));
  }

  protected processGetAll(response: HttpResponseBase): Observable<AppointmentVm[]> {
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
        if (resultData200 && resultData200.constructor === Array) {
          result200 = [];
          for (const item of resultData200) {
            result200.push(AppointmentVm.fromJSON(item));
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
    return _observableOf<AppointmentVm[]>(null as any);
  }

  delete(id: string): Observable<AppointmentVm> {
    let url = this.baseUrl + '/appointment/delete';

    if (id === undefined || id === null) {
      throw new Error('The parameter \'id\' must be defined.');
    }
    url = url.replace(/[?&]$/, '');

    const options: any = {
      body: id,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http.request('delete', url, options).pipe(_observableMergeMap((response: any) => {
      return this.processDelete(response);
    })).pipe(_observableCatch((response: any) => {
      if (response instanceof HttpResponseBase) {
        try {
          return this.processDelete(response as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<AppointmentVm>;
        }
      } else {
        return _observableThrow(response) as any as Observable<AppointmentVm>;
      }
    }));
  }

  protected processDelete(response: HttpResponseBase): Observable<AppointmentVm> {
    return this.processUpdate(response);
  }

  protected processUpdate(response: HttpResponseBase): Observable<AppointmentVm> {
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
        result200 = resultData200 ? AppointmentVm.fromJSON(resultData200) : new AppointmentVm();
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
    return _observableOf<AppointmentVm>(null as any);
  }
}
