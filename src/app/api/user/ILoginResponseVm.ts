import {UserVm} from "./UserVm";

export interface ILoginResponseVm {
  token: string;
  expiresIn: string;
  user: UserVm;
}
