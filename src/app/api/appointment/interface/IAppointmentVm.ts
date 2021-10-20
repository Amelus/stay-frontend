import {AppointmentType} from "../AppointmentType";
import {UserVm} from "../../user/UserVm";
import {IBaseVm} from "../../shared/IBaseVm";

export interface IAppointmentVm extends IBaseVm {
  type: AppointmentType;
  date: Date;
  available?: boolean | true;
  participants?: UserVm[] | null;
  information?: string | null;
}
