import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewContactWindowComponent} from './new-contact-window.component';
import {of} from 'rxjs';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonHarness} from '@angular/material/button/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

describe('NewContactWindowComponent', () => {
  let component: NewContactWindowComponent;
  let fixture: ComponentFixture<NewContactWindowComponent>;
  let loader: HarnessLoader;

  class MdDialogMock {
    open() {
      return {
        afterClosed: () => of({name: 'some object'})
      };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewContactWindowComponent],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [{MatDialog, useClass: MdDialogMock}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContactWindowComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the "Create new contact" title', () => {
    const title = document.querySelector('#new-contact-window-title') as HTMLElement;

    expect(title.textContent).toBe('Create new contact');
  });

  it('should disable the submit button if name is empty', async () => {
    component.contactForm.controls['name'].setValue('');
    component.contactForm.updateValueAndValidity();
    fixture.detectChanges();
    await fixture.whenStable();

    const submitButton = document.querySelector('.contact-form .mat-raised-button') as HTMLButtonElement;

    expect(submitButton.disabled).toBeTrue();
  });

  it('should enable the submit button if name is not empty', async () => {
    component.contactForm.controls['name'].setValue('Sarah');
    component.contactForm.updateValueAndValidity();
    fixture.detectChanges();
    await fixture.whenStable();

    const submitButton = document.querySelector('.contact-form .mat-raised-button') as HTMLButtonElement;

    expect(submitButton.disabled).toBeFalse();
  });

  it('should submit the form', async () => {
    spyOn(component.addContact, 'emit');

    // Fill form
    component.contactForm.controls['name'].setValue('Arnold');
    component.contactForm.controls['surname'].setValue('Schwarzenegger');
    component.contactForm.controls['phone'].setValue('003632783284');
    component.contactForm.controls['email'].setValue('arnegger@gmail.com');
    component.contactForm.controls['address'].setValue('Terminator Avenue 73, Los Angeles, California');

    const acceptButtonHarness = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'Add Contact'}));
    const acceptButton = await acceptButtonHarness.host();
    await acceptButton.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.addContact.emit).toHaveBeenCalledWith({
      name: 'Arnold',
      surname: 'Schwarzenegger',
      phone: '003632783284',
      email: 'arnegger@gmail.com',
      address: 'Terminator Avenue 73, Los Angeles, California'
    });
  });

  it('should render 5 text inputs', async () => {
    const formInputs = document.querySelectorAll('.contact-form-input');

    expect(formInputs.length).toBe(5);
  });
});
