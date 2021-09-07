// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {UserVm} from "../api/user/UserVm";
import {UserClient} from "../api/user/UserClient";

@Component({
  selector: 'app-stay-informed',
  templateUrl: './stay-informed.page.html',
  styleUrls: ['./stay-informed.page.scss'],
})
export class StayInformedPage implements OnInit {
  currentUser: UserVm;
  isAdmin: boolean;
  isEdit: boolean;

  colorEditButtonOff: string;
  colorEditButtonOn: string;
  currentEditColor: string;

  constructor(private userClient: UserClient) {
    this.currentUser = this.userClient.getSessionUser();
    this.isAdmin = this.currentUser.username === 'admin1'; // TODO: need to be moved somewhere else
    this.isEdit = false;

    this.colorEditButtonOff = '#00FF00';
    this.colorEditButtonOn = '#FF0000';
    this.currentEditColor = this.colorEditButtonOn;
  }

  ngOnInit() {
    this.isEdit = false;
  }

  private toggleEdit(event: Event) {
    this.isEdit = !this.isEdit;
    // const x = document.getElementById('editButton').children[0];   // Get the element with id="demo"
    if (this.isEdit) {
      this.currentEditColor = this.colorEditButtonOn;
    } else {
      this.currentEditColor = this.colorEditButtonOff;
    }
  }

  private addNewCard() {
    alert('TODO: need to implement this too');
  }
}
