import {catchError as _observableCatch, mergeMap as _observableMergeMap} from 'rxjs/operators';
import {Observable, of as _observableOf, throwError as _observableThrow} from 'rxjs';
import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse, HttpResponseBase} from '@angular/common/http';

import {API_BASE_URL, blobToText, throwException,} from '../api';

@Injectable({
  providedIn: 'root'
})
export class Client {
  private http: HttpClient;
  private baseUrl: string; // http://localhost:4200/api
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl ? baseUrl : 'http://localhost:8080/api';
  }

  hello(): Observable<void> {
    let url = this.baseUrl + '/root/hello';
    url = url.replace(/[?&]$/, '');

    const options: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({})
    };

    return this.http.request('get', url, options).pipe(_observableMergeMap((response: any) => {
      return this.processHello(response);
    })).pipe(_observableCatch((response: any) => {
      if (response instanceof HttpResponseBase) {
        try {
          return this.processHello(response as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<void>;
        }
      } else {
        return _observableThrow(response) as any as Observable<void>;
      }
    }));
  }

  protected processHello(response: HttpResponseBase): Observable<void> {
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
        return _observableOf<void>(null as any);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(responseText => {
        return throwException('An unexpected server error occurred.', status, responseText, headers);
      }));
    }
    return _observableOf<void>(null as any);
  }
}
