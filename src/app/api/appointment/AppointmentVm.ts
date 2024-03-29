import {IAppointmentVm} from './interface/IAppointmentVm';

export class AppointmentVm implements IAppointmentVm {

  constructor(data?: IAppointmentVm) {
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
  extendedProps: {
    creator: string,
    content?: string | null,
    global: boolean,
  };
  title: string;
  start?: Date | null;
  end?: Date | null;
  allDay: boolean;
  daysOfWeek?: number[] | null;
  startTime?: string | null;
  endTime?: string | null;
  startRecur?: Date | null;
  endRecur?: Date | null;
  backgroundColor?: string | null;
  borderColor?: string | null;

  static fromJS(data: any): AppointmentVm {
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
      this.extendedProps = data.extendedProps !== undefined ? data.extendedProps : null as any;
      this.title = data.title !== undefined ? data.title : null as any;
      this.allDay = data.allDay !== undefined ? data.allDay : null as any;
      this.backgroundColor = data.backgroundColor !== undefined ? data.backgroundColor : null as any;
      this.borderColor = data.backgroundColor !== undefined ? data.backgroundColor : null as any;

      this.start = data.start ? new Date(data.start.toString()) : null as any;
      this.end = data.end ? new Date(data.end.toString()) : null as any;

      this.daysOfWeek = data.daysOfWeek !== undefined ? data.daysOfWeek : null as any;
      this.startTime = data.startTime !== undefined ? data.startTime : null as any;
      this.endTime = data.endTime !== undefined ? data.endTime : null as any;
      this.startRecur = data.startRecur ? new Date(data.startRecur.toString()) : null as any;
      this.endRecur = data.endRecur ? new Date(data.endRecur.toString()) : null as any;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.createdAt = this.createdAt ? this.createdAt.toISOString() : null as any;
    data.updatedAt = this.updatedAt ? this.updatedAt.toISOString() : null as any;
    data.id = this.id !== undefined ? this.id : null as any;
    data.extendedProps = data.extendedProps !== undefined ? data.extendedProps : null as any;
    data.title = data.title !== undefined ? data.title : null as any;
    data.allDay = data.allDay !== undefined ? data.allDay : null as any;
    data.backgroundColor = data.backgroundColor !== undefined ? data.backgroundColor : null as any;
    data.borderColor = data.backgroundColor !== undefined ? data.backgroundColor : null as any;

    data.start = data.start ? data.start.toISOString() : null as any;
    data.end = data.end ? data.end.toISOString() : null as any;

    data.daysOfWeek = data.daysOfWeek !== undefined ? data.daysOfWeek : null as any;
    data.startTime = data.startTime !== undefined ? data.startTime : null as any;
    data.endTime = data.endTime !== undefined ? data.endTime : null as any;
    data.startRecur = data.startRecur ? data.startRecur.toISOString() : null as any;
    data.endRecur = data.endRecur ? data.endRecur.toISOString() : null as any;
    return data;
  }
}
