import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, FullCalendarComponent} from "@fullcalendar/angular";
import {MeetingVm} from "../api/meeting/MeetingVm";
import {ModalController, PopoverController, ToastController} from "@ionic/angular";
import {ViewWillEnter} from "@ionic/angular/types/ionic-lifecycle-hooks";
import {MeetingClient} from "../api/meeting/MeetingClient";
import {MeetingCreationComponent} from "../components/meeting/meeting-creation/meeting-creation.component";

@Component({
  selector: 'app-stay-in-touch-admin',
  templateUrl: './stay-in-touch-admin.page.html',
  styleUrls: ['./stay-in-touch-admin.page.scss'],
})
export class StayInTouchAdminPage implements OnInit, ViewWillEnter {

  @ViewChild('calendarComponent', {static: false}) calendarComponent: FullCalendarComponent;

  calendarEvents: MeetingVm[] = [];

  calendarOptions: CalendarOptions = {
    contentHeight: 'auto',
    initialView: 'dayGridMonth',
    themeSystem: 'bootstrap',
    events: this.calendarEvents,
    weekends: true,
    locale: 'de',
    nowIndicator: true,
    firstDay: 1,
    displayEventTime: false,
    allDayText: 'Ganztägig',
    noEventsText: 'Derzeit keine Termine',
    headerToolbar: {
      left: 'listWeek timeGridWeek dayGridMonth',
      center: 'title',
      right: 'prev next'
    },
    buttonText: {
      today: 'Heute',
      month: 'Monat',
      week: 'Woche',
      list: 'Terminübersicht'
    },
    slotLabelFormat: {
      hour: 'numeric',
      meridiem: false,
      omitZeroMinute: true,
    }
  };

  constructor(private meetingClient: MeetingClient,
              private toastController: ToastController,
              private popoverController: PopoverController,
              private modalController: ModalController) {
  }

  ionViewWillEnter() {
    this.calendarComponent.getApi().today();
  }

  ngOnInit() {

  }

  async addMeeting() {
    const eventView = await this.modalController.create(
      {
        component: MeetingCreationComponent,
        componentProps: {
          meetings: this.calendarEvents,
          calendar: this.calendarComponent
        },
        cssClass: 'meeting-component .modal-wrapper'
      }
    );
    await eventView.present();
  }
}
