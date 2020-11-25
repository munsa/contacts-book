import {Component, OnInit, ViewChild} from '@angular/core';
import {Contact} from '../../model/contact.model';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material/dialog';
import {NewContactWindowComponent} from '../new-contact-window/new-contact-window.component';
import {ContactDetailWindowComponent} from '../contact-detail-window/contact-detail-window.component';
import {MatTableDataSource} from '@angular/material/table';
import {ContactFullNamePipe} from '../../shared/pipes/contact-full-name.pipe';

// Test hardcoded contacts
const ELEMENT_DATA: Contact[] = [
  {
    name: 'Marc',
    surname: 'Monserrat',
    phone: '699849644',
    email: 'mmonserrat90@gmail.com',
    address: 'Speckbachergasse 32/6-7, 1160 Vienna'
  },
  {
    name: 'Victor',
    surname: 'Dueso',
    phone: '676989832',
    email: 'vdueso@hpaz.com',
    address: 'Calle Pez 43 1º 2ª, 28004 Madrid'
  },
  {
    name: 'Alex',
    surname: 'Gonzalez',
    phone: '694837263',
    email: 'alegontri@hotmail.com',
    address: 'Carrer Diputació 106 3-1, 08015 Barcelona'
  }
]

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  public contactList: MatTableDataSource<Contact>;
  public displayedColumns: string[];
  public selection: SelectionModel<Contact>;

  constructor(public dialog: MatDialog, private contactFullName: ContactFullNamePipe) {
    this.contactList = new MatTableDataSource(ELEMENT_DATA);
    this.displayedColumns = ['icon', 'fullName'];
    this.selection = new SelectionModel<Contact>(false, []);
  }

  ngOnInit(): void {
    this.sortContactList();
  }

  sortContactList(): void {
    this.contactList.data.sort((a: Contact, b: Contact) => {
      if (this.contactFullName.transform(a) > this.contactFullName.transform(b)) {
        return 1;
      }
      if (this.contactFullName.transform(a) < this.contactFullName.transform(b)) {
        return -1;
      }
      return 0;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.contactList.filter = filterValue.trim().toLowerCase();
  }

  openContactWindow(selectedContact: Contact) {
    const dialogRef = this.dialog.open(ContactDetailWindowComponent, {data: {contact: selectedContact}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openNewContactWindow() {
    const dialogRef = this.dialog.open(NewContactWindowComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
