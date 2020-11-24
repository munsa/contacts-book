import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContactWindowComponent } from './new-contact-window.component';

describe('NewContactWindowComponent', () => {
  let component: NewContactWindowComponent;
  let fixture: ComponentFixture<NewContactWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewContactWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContactWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
