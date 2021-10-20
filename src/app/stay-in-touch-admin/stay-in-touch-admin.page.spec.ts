import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {StayInTouchAdminPage} from './stay-in-touch-admin.page';

describe('StayInTouchAdminPage', () => {
  let component: StayInTouchAdminPage;
  let fixture: ComponentFixture<StayInTouchAdminPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StayInTouchAdminPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StayInTouchAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
