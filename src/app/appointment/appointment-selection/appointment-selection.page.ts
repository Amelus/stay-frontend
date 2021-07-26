import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-appointment-selection',
  templateUrl: './appointment-selection.page.html',
  styleUrls: ['./appointment-selection.page.scss'],
})
export class AppointmentSelectionPage implements OnInit {

  validDates: Date[];
  type: string;

  constructor(private navParams: NavParams,
              public modalController: ModalController) { }

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
