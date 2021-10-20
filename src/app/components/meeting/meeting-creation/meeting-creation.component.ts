import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, NavParams, ToastController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MeetingClient} from "../../../api/meeting/MeetingClient";
import {MeetingVm} from "../../../api/meeting/MeetingVm";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-meeting-creation',
  templateUrl: './meeting-creation.component.html',
  styleUrls: ['./meeting-creation.component.scss'],
})
export class MeetingCreationComponent implements OnInit {

  form: FormGroup;
  meetings: MeetingVm[];
  allDay: boolean;
  recurringMeeting: boolean;
  minDate: string;
  maxDate: string;
  monthNames = 'Jan, Feb, Mar, Apr, Mai, Jun, Jul, Aug, Sep, Oct, Nov, Dec';
  minuteValues = '0,5,10,15,20,25,30,35,40,45,50,55';


  constructor(private modalController: ModalController,
              private alertController: AlertController,
              private toastController: ToastController,
              private meetingClient: MeetingClient,
              private formBuilder: FormBuilder,
              private navParams: NavParams) {
  }

  ngOnInit() {
    this.initForm();
    this.allDay = false;
    this.recurringMeeting = false;
    this.minDate = dayjs().toISOString();
    this.maxDate = dayjs().add(1, 'year').toISOString();
    this.meetings = this.navParams.get('meetings');
  }

  public async dismiss() {
    await this.modalController.dismiss({
      dismissed: true
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.displayValidationErrors();
      return;
    }
    this.dismiss();
    this.presentToast('Termin erfolgreich erstellt!')
  }

  toggleRecurring() {
    this.recurringMeeting = !this.recurringMeeting;
  }

  toggleAllDay() {
    this.allDay = !this.allDay;
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });

    await toast.present();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      content: [''],
      allDay: [false, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      daysOfWeek: [''],
      description: [''],
      recurringEndDate: ['']
    })
  }

  private displayValidationErrors() {
    const formKeys = Object.keys(this.form.controls);
    formKeys.forEach(key => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
  }
}
