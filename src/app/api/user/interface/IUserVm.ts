import {UserVmRole} from '../UserVmRole';

export interface IUserVm {
  createdAt?: Date | null;
  updatedAt?: Date | null;
  id?: string | null;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  role?: UserVmRole | null;
  imageUrl?: string | null;
}
