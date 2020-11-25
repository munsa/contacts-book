import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailWindowComponent } from './contact-detail-window.component';

describe('ContactWindowComponent', () => {
  let component: ContactDetailWindowComponent;
  let fixture: ComponentFixture<ContactDetailWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
