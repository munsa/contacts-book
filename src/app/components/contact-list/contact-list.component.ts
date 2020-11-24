import {Component, OnInit} from '@angular/core';
import {Contact} from '../../model/contact.model';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material/dialog';
import {NewContactWindowComponent} from '../new-contact-window/new-contact-window.component';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  public contactList: Contact[];
  public displayedColumns: string[];
  public selection: SelectionModel<Contact>;

  constructor(public dialog: MatDialog) {
    // Test hardcoded contacts
    this.contactList = [
      new Contact(
        'Marc',
        'Monserrat',
        '699849644',
        'mmonserrat90@gmail.com',
        'Speckbachergasse 32/6-7, 1160 Vienna'),
      new Contact(
        'Victor',
        'Dueso',
        '676989832',
        'vdueso@hpaz.com',
        'Calle Pez 43 1º 2ª, 28004 Madrid'),
      new Contact(
        'Alex',
        'Gonzalez',
        '694837263',
        'alegontri@hotmail.com',
        'Carrer Diputació 106 3-1, 08015 Barcelona')
    ]

    this.displayedColumns = ['name', 'surname', 'phone', 'email', 'address'];
    this.selection = new SelectionModel<Contact>(false, []);
  }

  ngOnInit(): void {
  }

  openNewContactWindow() {
    const dialogRef = this.dialog.open(NewContactWindowComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
