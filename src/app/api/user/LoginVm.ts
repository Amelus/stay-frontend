import {ILoginVm} from "./ILoginVm";

export class LoginVm implements ILoginVm {

  constructor(data?: ILoginVm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  username!: string;
  password!: string;

  static fromJS(data: any): LoginVm {
    data = typeof data === 'object' ? data : {};
    const result = new LoginVm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.username = data.username !== undefined ? data.username : null as any;
      this.password = data.password !== undefined ? data.password : null as any;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.username = this.username !== undefined ? this.username : null as any;
    data.password = this.password !== undefined ? this.password : null as any;
    return data;
  }
}
