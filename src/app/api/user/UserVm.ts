import {IUserVm} from "./interface/IUserVm";
import {UserVmRole} from "./UserVmRole";

export class UserVm implements IUserVm {

  constructor(data?: IUserVm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  createdAt?: Date | null;
  updatedAt?: Date | null;
  id?: string | null;
  username!: string;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  role?: UserVmRole | null;
  imageUrl?: string | null;

  static fromJS(data: any): UserVm {
    data = typeof data === 'object' ? data : {};
    const result = new UserVm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.createdAt = data.createdAt ? new Date(data.createdAt.toString()) : null as any;
      this.updatedAt = data.updatedAt ? new Date(data.updatedAt.toString()) : null as any;
      this.id = data.id !== undefined ? data.id : null as any;
      this.username = data.username !== undefined ? data.username : null as any;
      this.firstName = data.firstName !== undefined ? data.firstName : null as any;
      this.lastName = data.lastName !== undefined ? data.lastName : null as any;
      this.fullName = data.fullName !== undefined ? data.fullName : null as any;
      this.role = data.role !== undefined ? data.role : null as any;
      this.imageUrl = data.imageUrl !== undefined ? data.imageUrl : null as any;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.createdAt = this.createdAt ? this.createdAt.toISOString() : null as any;
    data.updatedAt = this.updatedAt ? this.updatedAt.toISOString() : null as any;
    data.id = this.id !== undefined ? this.id : null as any;
    data.username = this.username !== undefined ? this.username : null as any;
    data.firstName = this.firstName !== undefined ? this.firstName : null as any;
    data.lastName = this.lastName !== undefined ? this.lastName : null as any;
    data.fullName = this.fullName !== undefined ? this.fullName : null as any;
    data.role = this.role !== undefined ? this.role : null as any;
    data.imageUrl = this.imageUrl !== undefined ? this.imageUrl : null as any;
    return data;
  }
}
