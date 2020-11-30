import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContactDetailWindowComponent} from './contact-detail-window.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ContactFullNamePipe} from '../../../shared/pipes/contact-full-name.pipe';

describe('ContactDetailWindowComponent', () => {
  let component: ContactDetailWindowComponent;
  let fixture: ComponentFixture<ContactDetailWindowComponent>;
  let loader: HarnessLoader;

  let contactData = {
    name: 'Arnold',
    surname: 'Schwarzenegger',
    phone: '003632783284',
    email: 'arnegger@gmail.com',
    address: 'Terminator Avenue 73, Los Angeles, California'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactDetailWindowComponent,
        ContactFullNamePipe
      ],
      imports: [MatIconModule],
      providers: [
        ContactFullNamePipe,
        {
          provide: MAT_DIALOG_DATA, useValue: {
            contact: contactData
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailWindowComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the name', () => {
    const fullNameDetail = document.querySelector('#contact-detail-name');
    expect(fullNameDetail.textContent).toBe('Schwarzenegger, Arnold');
  });

  it('should render the phone', () => {
    const phoneDetail = document.querySelector('#contact-detail-phone');
    expect(phoneDetail.textContent).toBe('003632783284');
  });

  it('should render the email', () => {
    const emailDetail = document.querySelector('#contact-detail-email');
    expect(emailDetail.textContent).toBe('arnegger@gmail.com');
  });

  it('should render the address', () => {
    const addressDetail = document.querySelector('#contact-detail-address');

    expect(addressDetail.textContent).toBe('Terminator Avenue 73, Los Angeles, California');
  });
});
