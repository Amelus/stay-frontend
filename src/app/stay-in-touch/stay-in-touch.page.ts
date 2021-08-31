// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AppointmentClient} from "../api/appointment/AppointmentClient";
import {AppointmentSelectionPage} from "../appointment/appointment-selection/appointment-selection.page";
import {UserClient} from "../api/user/UserClient";
import {Router} from "@angular/router";
import {UserVm} from "../api/user/UserVm";

@Component({
  selector: 'app-stay-in-touch',
  templateUrl: './stay-in-touch.page.html',
  styleUrls: ['./stay-in-touch.page.scss'],
})
export class StayInTouchPage implements OnInit {
  f2fAppointments: Date[];
  webinarAppointments: Date[];
  currentUser: UserVm;

  constructor(private modalController: ModalController,
              private appointmentClient: AppointmentClient,
              private userClient: UserClient,
              private router: Router) { }

  ngOnInit() {
    this.getAppointments();
    this.currentUser = this.userClient.getSessionUser();
  }

  getAppointments() {
    /*this.appointmentClient.getAll()
      .subscribe((appointments: AppointmentVm[]) => {
      this.f2fAppointments = appointments.filter(appointment => appointment.title === 'F2F');
      this.webinarAppointments = appointments.filter(appointment => appointment.title === 'Webinar');
    });*/

  }

  async getF2FAppointment() {
    if (this.currentUser == null) {
      await this.router.navigate(['/login']);
    } else {
      const eventView = await this.modalController.create(
        {
          component: AppointmentSelectionPage,
          componentProps: {
            validDates: this.f2fAppointments,
            type: 'F2F',
          },
          cssClass: 'appointment-selection-modal-css .modal-wrapper'
        });
      (await eventView).present();
    }
  }

  async getWebinarAppointment() {
    if (this.currentUser == null) {
      await this.router.navigate(['/login']);
    } else {
      const eventView = await this.modalController.create(
        {
          component: AppointmentSelectionPage,
          componentProps: {
            validDates: this.webinarAppointments,
            type: 'Webinar',
          },
          cssClass: 'appointment-selection-modal-css .modal-wrapper'
        });
      (await eventView).present();
    }

  }
}
