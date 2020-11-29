import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContactListComponent} from './contact-list.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {StoreModule} from '@ngrx/store';
import {contactReducer} from '../../reducers/contact.reducer';
import {ContactFullNamePipe} from '../../shared/pipes/contact-full-name.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatInputHarness} from '@angular/material/input/testing';
import {MatRowHarness, MatTableHarness} from '@angular/material/table/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewContactWindowComponent} from './new-contact-window/new-contact-window.component';
import {ContactDetailWindowComponent} from './contact-detail-window/contact-detail-window.component';
import {of} from 'rxjs';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let loader: HarnessLoader;
  let dialog: MatDialog;

  class MdDialogMock {
    open() {
      return {
        afterClosed: () => of({name: 'some object'})
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
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({contacts: contactReducer})
      ],
      providers: [
        ContactFullNamePipe,
        {MatDialog, useClass: MdDialogMock}
      ]
    }).compileComponents().then(() => {
      dialog = TestBed.inject(MatDialog);
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.contactList = new MatTableDataSource([
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
    ]);

    component.sortContactList(component.contactList.data);
  });

  // Close the windows if exist
  afterEach(async () => {
    const backdrop = document.querySelector('.cdk-overlay-backdrop') as HTMLElement;
    if (backdrop) {
      await backdrop.click();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all the contacts', async () => {
    const rows = await loader.getAllHarnesses<MatRowHarness>(MatRowHarness);

    expect(rows.length).toBe(4);
  });

  it('should render each contact in alphabetical order', async () => {
    const rows = await loader.getAllHarnesses<MatRowHarness>(MatRowHarness);

    const renderRowsTestCases = [
      {icon: 'person', fullName: 'Dueso, Victor'},
      {icon: 'person', fullName: 'Gonzalez, Alex'},
      {icon: 'person', fullName: 'Martinez, Marc'},
      {icon: 'person', fullName: 'Monserrat, Marc'}
    ];
    let renderedRowCount = 0;
    for (let i = 0; i < rows.length; i++) {
      const rowColumns = await rows[i].getCellTextByColumnName();
      if (rowColumns.icon === renderRowsTestCases[i].icon
        && rowColumns.fullName === renderRowsTestCases[i].fullName) {
        renderedRowCount++;
      }
    }

    expect(renderedRowCount).toBe(4);
  });

  const filterTestCases = [
    {filterValue: 'Marc', expected: 2},
    {filterValue: 'Vienna', expected: 1},
    {filterValue: '6', expected: 4},
    {filterValue: 'Barcelona', expected: 2},
    {filterValue: '@', expected: 4},
    {filterValue: '', expected: 4},
    {filterValue: 'test', expected: 0},
  ];
  filterTestCases.forEach((test, index) => {
    it(`should filter the contacts with the filter "${test.filterValue}"`, async () => {
      const filter = await loader.getHarness<MatInputHarness>(MatInputHarness);
      const table = await loader.getHarness<MatTableHarness>(MatTableHarness);

      await filter.setValue(test.filterValue);

      const rows = await table.getRows();
      expect(rows.length).toBe(test.expected);
    });

    it(`should show the footer message for the filter "${test.filterValue}"`, async () => {
      const filter = await loader.getHarness<MatInputHarness>(MatInputHarness);
      const table = await loader.getHarness<MatTableHarness>(MatTableHarness);

      await filter.setValue(test.filterValue);

      const footer = await table.getFooterRows();
      const cells = await footer[0].getCells();
      const footerText = await cells[1].getText();

      let expectedTest = '';
      if (test.expected === 0) {
        expectedTest = 'There are no contacts with this filter';
      } else {
        expectedTest = test.expected + ' Contacts';
      }

      expect(footerText).toBe(expectedTest);
    });
  });

  it('should create an Add button', async () => {
    const button = await loader.getHarness<MatButtonHarness>(MatButtonHarness);
    const buttonText = await button.getText();

    expect(buttonText).toBe('person_addAdd Contact');
  });

  it('should open the contact creation window', async () => {
    const button = await loader.getHarness<MatButtonHarness>(MatButtonHarness);
    await button.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const dialog = document.querySelector('.mat-dialog-container .contact-form');

    expect(dialog).toBeTruthy();
  });

  it('should open the contact detail window', async () => {
    spyOn(dialog, 'open').and.callThrough();

    const rows = await loader.getAllHarnesses<MatRowHarness>(MatRowHarness);
    const host = await rows[0].host();
    await host.click();

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


  it(`should only highlight the selected row`, async () => {
    const rows = await loader.getAllHarnesses<MatRowHarness>(MatRowHarness);
    const activeRow = await rows[2].host();

    // Open window selecting the row
    await activeRow.click();
    fixture.detectChanges();
    await fixture.whenStable();

    // Look for the active row
    let rowsState = [];
    for (let i = 0; i < rows.length; i++) {
      const row = await rows[i].host();
      const isActive = await row.hasClass('active');

      rowsState.push(isActive);
    }

    expect(rowsState).toEqual([false, false, true, false]);
  });
});
