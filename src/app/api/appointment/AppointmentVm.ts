import {IAppointmentVm} from './interface/IAppointmentVm';
import {AppointmentType} from "./AppointmentType";
import {UserVm} from '../user/UserVm';

export class AppointmentVm implements IAppointmentVm {

  createdAt?: Date | null;
  updatedAt?: Date | null;
  id?: string | null;
  type: AppointmentType;
  date: Date;
  available?: boolean | true;
  participants?: UserVm[] | null;
  information?: string | null;

  constructor(data?: IAppointmentVm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  static fromJSON(data: any): AppointmentVm {
    data = typeof data === 'object' ? data : {};
    const result = new AppointmentVm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.createdAt = data.createdAt ? new Date(data.createdAt.toString()) : null as any;
      this.updatedAt = data.updatedAt ? new Date(data.updatedAt.toString()) : null as any;
      this.id = data.id !== undefined ? data.id : null as any;
      this.type = data.type !== undefined ? data.type : null as any;
      this.date = data.date ? new Date(data.date.toString()) : null as any;
      this.available = data.available !== undefined ? data.available : null as any;
      this.participants = data.participants !== undefined ? data.participants : null as any;
      this.information = data.information !== undefined ? data.information : null as any;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.createdAt = this.createdAt ? this.createdAt.toISOString() : null as any;
    data.updatedAt = this.updatedAt ? this.updatedAt.toISOString() : null as any;
    data.id = this.id !== undefined ? this.id : null as any;
    data.type = this.type !== undefined ? this.type : null as any;
    data.date = this.date ? this.date.toISOString() : null as any;
    data.available = this.available !== undefined ? this.available : null as any;
    data.participants = this.participants !== undefined ? this.participants : null as any;
    data.information = this.information !== undefined ? this.information : null as any;
    return data;
  }
}
