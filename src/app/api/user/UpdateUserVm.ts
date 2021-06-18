import {IUpdateUserVm} from "./interface/IUpdateUserVm";

export class UpdateUserVm implements IUpdateUserVm {

  constructor(data?: IUpdateUserVm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  imageUrl?: string | null;
  upgradeCode?: string | null;

  static fromJS(data: any): UpdateUserVm {
    data = typeof data === 'object' ? data : {};
    const result = new UpdateUserVm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.oldPassword = data.oldPassword !== undefined ? data.oldPassword : null as any;
      this.newPassword = data.newPassword !== undefined ? data.newPassword : null as any;
      this.confirmPassword = data.confirmPassword !== undefined ? data.confirmPassword : null as any;
      this.imageUrl = data.imageUrl !== undefined ? data.imageUrl : null as any;
      this.upgradeCode = data.upgradeCode !== undefined ? data.upgradeCode : null as any;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.oldPassword = this.oldPassword !== undefined ? this.oldPassword : null as any;
    data.newPassword = this.newPassword !== undefined ? this.newPassword : null as any;
    data.confirmPassword = this.confirmPassword !== undefined ? this.confirmPassword : null as any;
    data.imageUrl = this.imageUrl !== undefined ? this.imageUrl : null as any;
    data.upgradeCode = this.upgradeCode !== undefined ? this.upgradeCode : null as any;
    return data;
  }
}
