import {Component, OnInit} from '@angular/core';
import {Contact} from '../../shared/model/contact.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NewContactWindowComponent} from './new-contact-window/new-contact-window.component';
import {ContactDetailWindowComponent} from './contact-detail-window/contact-detail-window.component';
import {ContactFullNamePipe} from '../../shared/pipes/contact-full-name.pipe';
import {Store} from '@ngrx/store';
import {add} from '../../actions/contact.actions';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  public contacts: Contact[];
  public displayedColumns: string[];
  public selectedContactId: string;
  public newContactWindowRef: MatDialogRef<NewContactWindowComponent>;

  constructor(public dialog: MatDialog,
              private contactFullName: ContactFullNamePipe,
              private store: Store<{ contacts: Contact[] }>
  ) {
    this.displayedColumns = ['icon', 'fullName'];
  }

  ngOnInit() {
    this.store.select(state => state.contacts).subscribe(res => {
      this.contacts = [...res];
      this.sortContactList(this.contacts);
    });
  }

  sortContactList(contactList: Contact[]): void {
    contactList.sort((a: Contact, b: Contact) => {
      if (this.contactFullName.transform(a).toLowerCase() > this.contactFullName.transform(b).toLowerCase()) {
        return 1;
      }
      if (this.contactFullName.transform(a).toLowerCase() < this.contactFullName.transform(b).toLowerCase()) {
        return -1;
      }
      return 0;
    });
  }

  createContact(contact: Contact) {
    contact.id = uuidv4();
    this.store.dispatch(add({contact: contact}));
  }

  openContactDetailWindow(selectedContact: Contact): void {
    this.selectedContactId = selectedContact.id;
    const dialogRef = this.dialog.open(ContactDetailWindowComponent, {data: {contact: selectedContact}});

    dialogRef.afterClosed().subscribe(result => {
      this.selectedContactId = null;
    });
  }

  openNewContactWindow(): void {
    this.newContactWindowRef = this.dialog.open(NewContactWindowComponent);

    this.newContactWindowRef.componentInstance.addContact.subscribe((contact: Contact) => {
      this.createContact(contact);

      this.newContactWindowRef.close();
      this.newContactWindowRef.componentInstance.addContact.unsubscribe();
    });
  }

}
