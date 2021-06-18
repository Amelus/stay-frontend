import {IRegisterVm} from "./interface/IRegisterVm";

export class RegisterVm implements IRegisterVm {

  constructor(data?: IRegisterVm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  registrationCode!: string;
  username!: string;
  password!: string;
  firstName?: string | null;
  lastName?: string | null;

  static fromJS(data: any): RegisterVm {
    data = typeof data === 'object' ? data : {};
    const result = new RegisterVm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.registrationCode = data.registrationCode !== undefined ? data.registrationCode : null as any;
      this.username = data.username !== undefined ? data.username : null as any;
      this.password = data.password !== undefined ? data.password : null as any;
      this.firstName = data.firstName !== undefined ? data.firstName : null as any;
      this.lastName = data.lastName !== undefined ? data.lastName : null as any;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.registrationCode = this.registrationCode !== undefined ? this.registrationCode : null as any;
    data.username = this.username !== undefined ? this.username : null as any;
    data.password = this.password !== undefined ? this.password : null as any;
    data.firstName = this.firstName !== undefined ? this.firstName : null as any;
    data.lastName = this.lastName !== undefined ? this.lastName : null as any;
    return data;
  }
}
