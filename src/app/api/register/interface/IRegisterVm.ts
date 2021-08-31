export interface IRegisterVm {
  activationCode: string;
  email: string;
  username: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
}
