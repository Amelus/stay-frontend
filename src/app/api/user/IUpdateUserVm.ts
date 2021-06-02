export interface IUpdateUserVm {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  imageUrl?: string | null;
  upgradeCode?: string | null;
}
