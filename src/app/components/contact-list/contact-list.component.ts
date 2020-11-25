import {Component, OnInit, ViewChild} from '@angular/core';
import {Contact} from '../../shared/model/contact.model';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material/dialog';
import {NewContactWindowComponent} from '../new-contact-window/new-contact-window.component';
import {ContactDetailWindowComponent} from '../contact-detail-window/contact-detail-window.component';
import {MatTableDataSource} from '@angular/material/table';
import {ContactFullNamePipe} from '../../shared/pipes/contact-full-name.pipe';
import { Store } from '@ngrx/store';
import {add} from '../../actions/contact.actions';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  public contactList: MatTableDataSource<Contact>;
  public displayedColumns: string[];
  public selection: SelectionModel<Contact>;
  public selectedContactId: string;

  constructor(public dialog: MatDialog,
              private contactFullName: ContactFullNamePipe,
              private store: Store<{ contacts: Contact[] }>
  ) {
    this.store.select(state => state.contacts).subscribe(res => {
      this.contactList = new MatTableDataSource(res);
    });
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
    this.selectedContactId = selectedContact.id;
    const dialogRef = this.dialog.open(ContactDetailWindowComponent, {data: {contact: selectedContact}});

    dialogRef.afterClosed().subscribe(result => {
      this.selectedContactId = null;
    });
  }

  openNewContactWindow() {
    const dialogRef = this.dialog.open(NewContactWindowComponent);

    dialogRef.componentInstance.addContact.subscribe((contact: Contact) => {
      contact.id = uuidv4();

      this.store.dispatch(add({contact: contact}));

      dialogRef.close();
      dialogRef.componentInstance.addContact.unsubscribe();
    });
  }

}
