import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from '../model/contact.model';

@Pipe({name: 'contactFullName'})
export class ContactFullNamePipe implements PipeTransform {
  transform(contact: Contact): string {
    if(contact.surname !== '') {
      return contact.surname + ', ' + contact.name;
    } else {
      return contact.name;
    }
  }
}
