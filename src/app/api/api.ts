import {Observable, throwError as _observableThrow} from 'rxjs';
import {InjectionToken} from '@angular/core';
import {SwaggerException} from './shared/exception/SwaggerException';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; },
                        result?: any): Observable<any> {
  if (result !== null && result !== undefined) {
    return _observableThrow(result);
  } else {
    return _observableThrow(new SwaggerException(message, status, response, headers, null));
  }
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next('');
      observer.complete();
    } else {
      const reader = new FileReader();
      reader.onload = event => {
        observer.next((event.target as any).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}

export {blobToText, throwException};
