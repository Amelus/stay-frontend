/*var_vm_imports*/
import {ITemplateClassVm} from './interface/ITemplateClassVm';

export class TemplateClassVm implements ITemplateClassVm {

  constructor(data?: ITemplateClassVm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  /*var_variables*/

  static fromJS(data: any): TemplateClassVm {
    data = typeof data === 'object' ? data : {};
    const result = new TemplateClassVm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      /*var_init_vals*/
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    /*var_to_vals*/
    return data;
  }
}
