import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Contact} from '../../shared/model/contact.model';

@Component({
  selector: 'contact-detail-window',
  templateUrl: './contact-detail-window.component.html',
  styleUrls: ['./contact-detail-window.component.scss']
})
export class ContactDetailWindowComponent implements OnInit {

  public contact: Contact;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.contact = data.contact;
  }

  ngOnInit(): void {
  }

}
