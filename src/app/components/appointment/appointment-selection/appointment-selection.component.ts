import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
import {AppointmentType} from "../../../api/appointment/AppointmentType";

@Component({
  selector: 'app-appointment-selection',
  templateUrl: './appointment-selection.component.html',
  styleUrls: ['./appointment-selection.component.scss'],
})
export class AppointmentSelectionComponent implements OnInit {

  validDates: Date[];
  type: AppointmentType;

  constructor(private navParams: NavParams,
              public modalController: ModalController) {
  }

  ngOnInit() {
    this.validDates = this.navParams.get('validDates');
    this.type = this.navParams.get('type');
  }

  dateSelected($event: Date) {
      console.log('Folgender Termin wurde gewählt' + $event);
  }

  public async dismiss() {
    await this.modalController.dismiss({
      dismissed: true
    });
  }
}
