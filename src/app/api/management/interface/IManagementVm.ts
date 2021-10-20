import {UserVmRole} from "../../user/UserVmRole";

export interface IManagementVm {
  forename?: string | null;
  surename?: string | null;
  role?: UserVmRole | null;
  email?: string | null;
}
