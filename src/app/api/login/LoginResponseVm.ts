import {UserVm} from "../user/UserVm";
import {ILoginResponseVm} from "./interface/ILoginResponseVm";

export class LoginResponseVm implements ILoginResponseVm {

  constructor(data?: ILoginResponseVm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
    if (!data) {
      this.user = new UserVm();
    }
  }

  token!: string;
  expiresIn!: string;
  user!: UserVm;

  static fromJS(data: any): LoginResponseVm {
    data = typeof data === 'object' ? data : {};
    const result = new LoginResponseVm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.token = data.token !== undefined ? data.token : null as any;
      this.expiresIn = data.expiresIn !== undefined ? data.expiresIn : null as any;
      this.user = data.user ? UserVm.fromJS(data.user) : new UserVm();
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.token = this.token !== undefined ? this.token : null as any;
    data.expiresIn = this.expiresIn !== undefined ? this.expiresIn : null as any;
    data.user = this.user ? this.user.toJSON() : null as any;
    return data;
  }
}
