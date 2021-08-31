import {Component} from '@angular/core';
import {UserClient} from "../api/user/UserClient";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private userClient: UserClient) {
  }

}
