import * as moment from "moment";
import {IAppointmentParams} from "./IAppointmentParams";

export class AppointmentParams implements IAppointmentParams {

  constructor(data?: IAppointmentParams) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  title: string;
  content?: string | null;
  global: boolean | false;
  allDay: boolean | false;
  start?: Date | null;
  end?: Date | null;
  daysOfWeek?: number[] | null;
  startTime?: string | null;
  endTime?: string | null;
  backgroundColor?: string | null;

  /*
      static fromJS(data: any): AppointmentParams {
          data = typeof data === 'object' ? data : {};
          const result = new AppointmentParams();
          result.init(data);
          return result;
      }

      init(data?: any) {
          if (data) {
              this.title = data.title !== undefined ? data.title : null as any;
              this.content = data.content !== undefined ? data.content : null as any;
              this.global = data.global !== undefined ? data.global : null as any;
              this.allDay = data.allDay !== undefined ? data.allDay : null as any;
              this.backgroundColor = data.backgroundColor !== undefined ? data.backgroundColor : null as any;

              this.start = data.start ? new Date(data.start.toString()) : null as any;
              this.end = data.end ? new Date(data.end.toString()) : null as any;

              this.daysOfWeek = data.daysOfWeek !== undefined ? data.daysOfWeek : null as any;
              this.startTime = data.startTime !== undefined ? data.startTime : null as any;
              this.endTime = data.endTime !== undefined ? data.endTime : null as any;
              this.startRecur = data.startRecur ? new Date(data.startRecur.toString()) : null as any;
              this.endRecur = data.endRecur ? new Date(data.endRecur.toString()) : null as any;
          }
  }*/

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.title = this.title !== undefined ? this.title : null as any;
    data.content = this.content !== undefined ? this.content : null as any;
    data.global = this.global !== undefined ? this.global : null as any;
    data.allDay = this.allDay !== undefined ? this.allDay : null as any;
    data.backgroundColor = this.backgroundColor !== undefined ? this.backgroundColor : null as any;
    this.setTimes(data);
    return data;
  }

  private setTimes(data: any) {
    if (this.start !== undefined && this.end !== undefined) {
      const startDate = moment(this.start);
      let dateComponent = startDate.utc().format('YYYY-MM-DD');

      const endDate = moment(this.end);
      let dateEndComponent = endDate.utc().format('YYYY-MM-DD');

      let timeComponent = '';
      let timeEndComponent = '';

      if (this.startTime !== undefined && this.endTime !== undefined) {
        const timeStart = moment(this.startTime);
        timeComponent = timeStart.utc().format('HH:mm:ss');

        const timeEnd = moment(this.endTime);
        timeEndComponent = timeEnd.utc().format('HH:mm:ss');
      }

      if (this.daysOfWeek === undefined || this.daysOfWeek.length <= 0) {

        if (this.allDay !== undefined) {
          // Mega hack
          dateComponent = dateComponent + 'T' +  timeComponent + '.211+01:00';
          dateEndComponent = dateEndComponent + 'T' + timeEndComponent + '.211+01:00';
        }

        data.start = this.start ? new Date(dateComponent) : null as any;
        data.end = this.end ? new Date(dateEndComponent) : null as any;
        data.daysOfWeek = null as any;

      } else {
        data.daysOfWeek = this.daysOfWeek;

        data.startTime = timeComponent !== '' ? timeComponent : null as any;
        data.endTime = timeEndComponent !== '' ? timeEndComponent : null as any;

        data.startRecur = dateComponent ? new Date(dateComponent) : null as any;
        data.endRecur = dateEndComponent ? new Date(dateEndComponent) : null as any;
      }
    }
  }
}
