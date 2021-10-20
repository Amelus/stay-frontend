import {IManagementVm} from "./interface/IManagementVm";
import {UserVmRole} from "../user/UserVmRole";

export class ManagementVm implements IManagementVm {
  forename?: string | null;
  surename?: string | null;
  role?: UserVmRole | null;
  email?: string | null;

  constructor(data?: IManagementVm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  static fromJS(data: any): ManagementVm {
    data = typeof data === 'object' ? data : {};
    const result = new ManagementVm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.forename = data.forename !== undefined ? data.forename : null as any;
      this.surename = data.surename !== undefined ? data.surename : null as any;
      this.role = data.role !== undefined ? data.role : null as any;
      this.email = data.email !== undefined ? data.email : null as any;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.forename = this.forename !== undefined ? this.forename : null as any;
    data.surename = this.surename !== undefined ? this.surename : null as any;
    data.role = this.role !== undefined ? this.role : null as any;
    data.email = this.email !== undefined ? this.email : null as any;
    return data;
  }

  equal(other: ManagementVm): boolean {
    return (
      (this.forename === other.forename) &&
      (this.surename === other.surename) &&
      (this.email === other.email) &&
      (this.role === other.role)
    );
  }
}
