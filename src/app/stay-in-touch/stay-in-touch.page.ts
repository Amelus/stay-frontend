// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AppointmentClient} from "../api/appointment/AppointmentClient";
import {AppointmentSelectionComponent} from "../components/appointment/appointment-selection/appointment-selection.component";
import {UserClient} from "../api/user/UserClient";
import {Router} from "@angular/router";
import {UserVm} from "../api/user/UserVm";
import {AppointmentVm} from "../api/appointment/AppointmentVm";
import {AppointmentType} from "../api/appointment/AppointmentType";

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
    this.currentUser = this.userClient.getSessionUser();
    if (this.currentUser != null) {
      this.getAppointments();
    }
  }

  getAppointments() {
    this.appointmentClient.testGetAll()
      .subscribe((appointments: AppointmentVm[]) => {
        this.f2fAppointments = appointments.filter(appointment => appointment.type === AppointmentType.F2F)
          .map(appointment => appointment.date);
        this.webinarAppointments = appointments.filter(appointment => appointment.type === AppointmentType.WEBINAR)
          .map(appointment => appointment.date);
      });
  }

  async getF2FAppointment() {
    if (this.currentUser == null) {
      await this.router.navigate(['/register']);
    } else {
      const eventView = await this.modalController.create(
        {
          component: AppointmentSelectionComponent,
          componentProps: {
            validDates: this.f2fAppointments,
            type: AppointmentType.F2F,
          },
          cssClass: 'appointment-selection-modal-css .modal-wrapper'
        });
      (await eventView).present();
    }
  }

  async getWebinarAppointment() {
    if (this.currentUser == null) {
      await this.router.navigate(['/register']);
    } else {
      const eventView = await this.modalController.create(
        {
          component: AppointmentSelectionComponent,
          componentProps: {
            validDates: this.webinarAppointments,
            type: AppointmentType.WEBINAR,
          },
          cssClass: 'appointment-selection-modal-css .modal-wrapper'
        });
      (await eventView).present();
    }

  }
}
