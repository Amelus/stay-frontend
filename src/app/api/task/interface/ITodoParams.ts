import {TodoParamsStatus} from "../TodoParamsStatus";

export interface ITodoParams {
  creator?: string;
  assignee: string;
  title: string;
  content: string;
  dueDate: Date;
  status?: TodoParamsStatus | null;
}
