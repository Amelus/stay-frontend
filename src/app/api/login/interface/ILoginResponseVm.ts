import {UserVm} from "../../user/UserVm";

export interface ILoginResponseVm {
  token: string;
  expiresIn: string;
  user: UserVm;
}
