import {TodoVmStatus} from "./TodoVmStatus";
import {ITodoVm} from "./ITodoVm";

export class TodoVm implements ITodoVm {

  constructor(data?: ITodoVm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  createdAt?: Date | null;
  updatedAt?: Date | null;
  id?: string | null;
  creator!: string;
  assignee!: string;
  title!: string;
  content!: string;
  dueDate!: Date;
  status!: TodoVmStatus;
  isCompleted?: boolean | false;
  isChecked?: boolean | false;

  static fromJS(data: any): TodoVm {
    data = typeof data === 'object' ? data : {};
    const result = new TodoVm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.createdAt = data.createdAt ? new Date(data.createdAt.toString()) : null as any;
      this.updatedAt = data.updatedAt ? new Date(data.updatedAt.toString()) : null as any;
      this.id = data.id !== undefined ? data.id : null as any;
      this.creator = data.creator !== undefined ? data.creator : null as any;
      this.assignee = data.assignee !== undefined ? data.assignee : null as any;
      this.title = data.title !== undefined ? data.title : null as any;
      this.content = data.content !== undefined ? data.content : null as any;
      this.dueDate = data.dueDate ? new Date(data.dueDate.toString()) : null as any;
      this.status = data.status !== undefined ? data.status : null as any;
      this.isCompleted = data.isCompleted !== undefined ? data.isCompleted : null as any;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.createdAt = this.createdAt ? this.createdAt.toISOString() : null as any;
    data.updatedAt = this.updatedAt ? this.updatedAt.toISOString() : null as any;
    data.id = this.id !== undefined ? this.id : null as any;
    data.creator = this.creator !== undefined ? this.creator : null as any;
    data.assignee = this.assignee !== undefined ? this.assignee : null as any;
    data.title = this.title !== undefined ? this.title : null as any;
    data.content = this.content !== undefined ? this.content : null as any;
    data.status = this.status !== undefined ? this.status : null as any;
    data.dueDate = this.dueDate ? this.dueDate.toISOString() : null as any;
    data.isCompleted = this.isCompleted !== undefined ? this.isCompleted : null as any;
    return data;
  }
}
