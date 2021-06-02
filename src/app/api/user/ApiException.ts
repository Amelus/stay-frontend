import {IApiException} from "./IApiException";

export class ApiException implements IApiException {

  constructor(data?: IApiException) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  statusCode?: number | null;
  message?: string | null;
  status?: string | null;
  error?: string | null;
  errors?: any | null;
  timestamp?: string | null;
  path?: string | null;

  static fromJS(data: any): ApiException {
    data = typeof data === 'object' ? data : {};
    const result = new ApiException();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.statusCode = data.statusCode !== undefined ? data.statusCode : null as any;
      this.message = data.message !== undefined ? data.message : null as any;
      this.status = data.status !== undefined ? data.status : null as any;
      this.error = data.error !== undefined ? data.error : null as any;
      this.errors = data.errors !== undefined ? data.errors : null as any;
      this.timestamp = data.timestamp !== undefined ? data.timestamp : null as any;
      this.path = data.path !== undefined ? data.path : null as any;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.statusCode = this.statusCode !== undefined ? this.statusCode : null as any;
    data.message = this.message !== undefined ? this.message : null as any;
    data.status = this.status !== undefined ? this.status : null as any;
    data.error = this.error !== undefined ? this.error : null as any;
    data.errors = this.errors !== undefined ? this.errors : null as any;
    data.timestamp = this.timestamp !== undefined ? this.timestamp : null as any;
    data.path = this.path !== undefined ? this.path : null as any;
    return data;
  }
}
