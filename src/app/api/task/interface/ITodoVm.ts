import {TodoVmStatus} from "../TodoVmStatus";

export interface ITodoVm {
  createdAt?: Date | null;
  updatedAt?: Date | null;
  id?: string | null;
  creator: string;
  assignee: string;
  title: string;
  content: string;
  status: TodoVmStatus;
  dueDate: Date;
  isCompleted?: boolean | false;
  isChecked?: boolean | false;
}
