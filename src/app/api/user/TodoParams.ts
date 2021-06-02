import {ITodoParams} from "./ITodoParams";
import {TodoParamsStatus} from "./TodoParamsStatus";

export class TodoParams implements ITodoParams {

  constructor(data?: ITodoParams) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  creator?: string;
  assignee: string;
  title: string;
  content!: string;
  status?: TodoParamsStatus | null;
  dueDate: Date;

  static fromJS(data: any): TodoParams {
    data = typeof data === 'object' ? data : {};
    const result = new TodoParams();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.creator = data.creator !== undefined ? data.creator : null as any;
      this.assignee = data.assignee !== undefined ? data.assignee : null as any;
      this.title = data.title !== undefined ? data.title : null as any;
      this.content = data.content !== undefined ? data.content : null as any;
      this.dueDate = data.dueDate ? new Date(data.dueDate.toString()) : null as any;
      this.status = data.status !== undefined ? data.status : null as any;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.creator = this.creator !== undefined ? this.creator : null as any;
    data.assignee = this.assignee !== undefined ? this.assignee : null as any;
    data.title = this.title !== undefined ? this.title : null as any;
    data.content = this.content !== undefined ? this.content : null as any;
    data.status = this.status !== undefined ? this.status : null as any;
    data.dueDate = this.dueDate ? this.dueDate : null as any;
    return data;
  }
}
