import {IUpdateUserResponseVm} from "./interface/IUpdateUserResponseVm";
import {IUpdateUserVm} from "./interface/IUpdateUserVm";
import {UserVmRole} from "./UserVmRole";
import {UpdateUserStatus} from "./UpdateUserStatus";

export class UpdateUserResponseVm implements IUpdateUserResponseVm {

  constructor(data?: IUpdateUserVm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  imageUrl?: string | null;
  role?: UserVmRole | null;
  status!: UpdateUserStatus;

  static fromJS(data: any): UpdateUserResponseVm {
    data = typeof data === 'object' ? data : {};
    const result = new UpdateUserResponseVm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.imageUrl = data.imageUrl !== undefined ? data.imageUrl : null as any;
      this.role = data.role !== undefined ? data.role : null as any;
      this.status = data.status !== undefined ? data.status : null as any;
    }
  }

  toJSON(data?: any) {
    data.imageUrl = this.imageUrl !== undefined ? this.imageUrl : null as any;
    data.role = this.role !== undefined ? this.role : null as any;
    data.status = this.status !== undefined ? this.status : null as any;
    return data;
  }
}
