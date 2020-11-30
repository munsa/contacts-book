import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ContactListComponent} from './contact-list.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {ContactFullNamePipe} from '../../shared/pipes/contact-full-name.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewContactWindowComponent} from './new-contact-window/new-contact-window.component';
import {ContactDetailWindowComponent} from './contact-detail-window/contact-detail-window.component';
import {of} from 'rxjs';
import {provideMockStore} from '@ngrx/store/testing';
import {ScrollingModule} from '@angular/cdk/scrolling';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let loader: HarnessLoader;
  let dialog: MatDialog;
  const initialState = {
    contacts: [
      {
        id: '0',
        name: 'Marc',
        surname: 'Monserrat',
        phone: '699849644',
        email: 'mmonserrat90@gmail.com',
        address: 'Speckbachergasse 32/6-7, 1160 Vienna'
      },
      {
        id: '1',
        name: 'Victor',
        surname: 'Dueso',
        phone: '676989832',
        email: 'vdueso@hpaz.com',
        address: 'Calle Pez 43 1º 2ª, 28004 Madrid'
      },
      {
        id: '2',
        name: 'Alex',
        surname: 'Gonzalez',
        phone: '694837263',
        email: 'alegontri@hotmail.com',
        address: 'Carrer Diputació 106 3-1, 08015 Barcelona'
      },
      {
        id: '3',
        name: 'Marc',
        surname: 'Martinez',
        phone: '678926413',
        email: 'marmol@gmail.com',
        address: 'Carrer de Gran Via 302 7-B, 08032 Barcelona'
      }
    ]
  };

  class MdDialogMock {
    open() {
      return {
        afterClosed: () => of(null)
      };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactListComponent,
        NewContactWindowComponent,
        ContactDetailWindowComponent,
        ContactFullNamePipe
      ],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        ScrollingModule
      ],
      providers: [
        ContactFullNamePipe,
        {MatDialog, useClass: MdDialogMock},
        provideMockStore({initialState}),
      ]
    }).compileComponents().then(() => {
      dialog = TestBed.inject(MatDialog);
    });
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    fixture.autoDetectChanges();
    tick(500);

    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all the contacts', async () => {
    const items = document.querySelectorAll('#contact-item');

    expect(items.length).toBe(4);
  });

  it('should render each contact in alphabetical order', async () => {
    const items = document.querySelectorAll('#contact-name');

    const orderedItems = [];
    items.forEach(item => {
      orderedItems.push(item.textContent);
    });

    expect(orderedItems).toEqual([
      'Dueso, Victor',
      'Gonzalez, Alex',
      'Martinez, Marc',
      'Monserrat, Marc'
    ]);
  });

  it('should open the contact creation window', async () => {
    spyOn(dialog, 'open');

    const button = await loader.getHarness<MatButtonHarness>(MatButtonHarness);
    await button.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should open the contact detail window', async () => {
    spyOn(dialog, 'open');

    const item = document.querySelector('#contact-item') as HTMLElement;
    item.click();

    expect(dialog.open).toHaveBeenCalledWith(ContactDetailWindowComponent, {
      data: {
        contact: {
          id: '1',
          name: 'Victor',
          surname: 'Dueso',
          phone: '676989832',
          email: 'vdueso@hpaz.com',
          address: 'Calle Pez 43 1º 2ª, 28004 Madrid'
        }
      }
    });
  });


  it(`should only highlight the selected contact`, async () => {
    spyOn(dialog, 'open');

    const items = document.querySelectorAll('#contact-item');
    const activeItem = items[2] as HTMLElement;

    // Open window selecting the row
    await activeItem.click();
    fixture.detectChanges();
    await fixture.whenStable();

    // Look for the active row
    const rowsState = [];
    items.forEach(item => {
      const currentItem = item as HTMLElement;
      const isActive = currentItem.classList.contains('active');

      rowsState.push(isActive);
    });

    expect(rowsState).toEqual([false, false, true, false]);
  });

  it('should create an Add button', async () => {
    const button = await loader.getHarness<MatButtonHarness>(MatButtonHarness);
    const buttonText = await button.getText();

    expect(buttonText).toBe('person_addAdd Contact');
  });

  // Close the windows if exist
  afterEach(async () => {
    dialog.closeAll();
  });
});
