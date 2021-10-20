import {ManagementVm} from "./ManagementVm";
import {Injectable} from "@angular/core";
import {UserClient} from "../user/UserClient";
import {UserVmRole} from "../user/UserVmRole";

@Injectable({
  providedIn: 'root'
})
export class ManagementClient { // TODO: add more functions and attributes later

  constructor(private userClient: UserClient) {
  }

  // TODO: move all functionality to the UserClient!! Delete ManagementVm and use UserVm.
  public testGetUserManagement(): ManagementVm[] {
    // TODO: data will be loaded from the database later
    if (localStorage.getItem('managements') === null) {
      let managements: ManagementVm[] = [];

      managements.push(new ManagementVm({
        forename: 'Foo',
        surename: 'Bar',
        role: UserVmRole.Partner,
        email: 'test@mail.com',
      }));

      managements.push(new ManagementVm({
        forename: 'Franz',
        surename: 'Hans',
        role: UserVmRole.User,
        email: 'hans@franz.net',
      }));

      for (let i: number = 0; i < 10; ++i) {
        managements.push(new ManagementVm({
          forename: 'FName' + i,
          surename: 'SName' + i,
          role: UserVmRole.User,
          email: 'hans-' + i + '@franz.net',
        }));
      }

      localStorage.setItem('managements', JSON.stringify(managements));
    }

    let managements: ManagementVm[] = JSON.parse(localStorage.getItem('managements'))
      .map(management => ManagementVm.fromJS(management));

    return managements;
  }

  public testSaveManagement(managements: ManagementVm[]) {
    localStorage.setItem('managements', JSON.stringify(managements));
  }

  public testRemoveOneManagement(management: ManagementVm) {
    let managements: ManagementVm[] = JSON.parse(localStorage.getItem('managements'))
      .map(management => ManagementVm.fromJS(management));

    managements = managements.filter((managementIter: ManagementVm) => !managementIter.equal(management))

    localStorage.setItem('managements', JSON.stringify(managements));
  }

  public testAddOneManagement(management: ManagementVm) {
    let managements: ManagementVm[] = JSON.parse(localStorage.getItem('managements'))
      .map(management => ManagementVm.fromJS(management));

    managements.push(management);

    localStorage.setItem('managements', JSON.stringify(managements));
  }
}
