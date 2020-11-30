import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Contact} from '../../../shared/model/contact.model';

@Component({
  selector: 'app-new-contact-window',
  templateUrl: './new-contact-window.component.html',
  styleUrls: ['./new-contact-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewContactWindowComponent implements OnInit {

  @Output() addContact = new EventEmitter<Contact>();

  public contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

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
    if (this.contactForm.valid) {
      this.addContact.emit(this.contactForm.value);
    }
  }
}
