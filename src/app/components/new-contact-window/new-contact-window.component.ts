import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Contact} from '../../model/contact.model';

@Component({
  selector: 'new-contact-window',
  templateUrl: './new-contact-window.component.html',
  styleUrls: ['./new-contact-window.component.scss']
})
export class NewContactWindowComponent implements OnInit {

  public contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: '',
      phone: '',
      email: '',
      address: ''
    });
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      console.log(this.contactForm.value);
      return;
    }
    console.log(this.contactForm.value);
  }

}
