import {CardVm} from "./CardVm";
import {Injectable} from "@angular/core";
import {UserClient} from "../user/UserClient";

@Injectable({
  providedIn: 'root'
})
export class CardClient { // TODO: add more functions and attributes later

  constructor(private userClient: UserClient) { }

  public testGetUserCards(): CardVm[] {
    // TODO: data will be loaded from the database later
    if (localStorage.getItem('cards') === null) {
      let cards: CardVm[] = [];

      cards.push(new CardVm({
        srcpath: 'assets/rolf-sample.jpg',
        subtitle: 'Die Person',
        title: 'Rolf Kipp',
        content: 'Rolf Kipp ist bereits seit über 25 Jahren in seiner Branche tätig.\n' +
          '          Mittlerweile rangiert er dort in den Top 5 der umsatzstärksten Unternehmer weltweit\n' +
          '          und hat sich ein Vertriebssystem aufgebaut das 2.2 Millionen Vertriebspartner umfasst.',
        id: 0,
      }));

      cards.push(new CardVm({
        srcpath: 'assets/rolf-sample-2.jpg',
        subtitle: 'Erfolg',
        title: 'Aufbau eines neuen Geschäfts',
        content: 'Erfahre wie du haupt- oder nebenberuflich ein ethisch & krisensicheres Geschäft aufbaust,\n' +
          '          welches funktioniert, auch wenn man sich zur Ruhe setzt.',
        id: 1,
      }));

      localStorage.setItem('cards', JSON.stringify(cards));
    }

    let cards: CardVm[] = JSON.parse(localStorage.getItem('cards'))
      .map(card => CardVm.fromJS(card));

    return cards;
  }

  public testSaveCards(cards: CardVm[]) {
    localStorage.setItem('cards', JSON.stringify(cards));
  }

  public testRemoveOneCard(card: CardVm) {
    let cards: CardVm[] = JSON.parse(localStorage.getItem('cards'))
      .map(card => CardVm.fromJS(card));

    cards = cards.filter((cardIter: CardVm) => !cardIter.equal(card))

    localStorage.setItem('cards', JSON.stringify(cards));
  }

  public testAddOneCard(card: CardVm) {
    let cards: CardVm[] = JSON.parse(localStorage.getItem('cards'))
      .map(card => CardVm.fromJS(card));

    cards.push(card);

    localStorage.setItem('cards', JSON.stringify(cards));
  }
}
