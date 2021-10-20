export interface IBaseVm {
  createdAt?: Date | null;
  updatedAt?: Date | null;
  id?: string | null;

  init(data?: any);

  toJSON(data?: any);
}
