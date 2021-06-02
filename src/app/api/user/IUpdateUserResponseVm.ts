import {UserVmRole} from "./UserVmRole";
import {UpdateUserStatus} from "./UpdateUserStatus";

export interface IUpdateUserResponseVm {
  imageUrl?: string | null;
  role?: UserVmRole | null;
  status: UpdateUserStatus;
}
