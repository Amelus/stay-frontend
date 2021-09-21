import {ICardVm} from "./interface/ICardVm";

export class CardVm implements ICardVm {
  constructor(data?: ICardVm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  srcpath?: string | null;
  subtitle?: string | null;
  title?: string | null;
  content?: string | null;
  id?: number | null;

  static fromJS(data: any): CardVm {
    data = typeof data === 'object' ? data : {};
    const result = new CardVm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.srcpath = data.srcpath !== undefined ? data.srcpath : null as any;
      this.subtitle = data.subtitle !== undefined ? data.subtitle : null as any;
      this.title = data.title !== undefined ? data.title : null as any;
      this.content = data.content !== undefined ? data.content : null as any;
      this.id = data.id !== undefined ? data.id : null as any;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.srcpath = this.srcpath !== undefined ? this.srcpath : null as any;
    data.subtitle = this.subtitle !== undefined ? this.subtitle : null as any;
    data.title = this.title !== undefined ? this.title : null as any;
    data.content = this.content !== undefined ? this.content : null as any;
    data.id = this.id !== undefined ? this.id : null as any;
    return data;
  }
}
