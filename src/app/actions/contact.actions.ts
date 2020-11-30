import {createAction, props} from '@ngrx/store';
import {Contact} from '../shared/model/contact.model';

export const enum ContactActionTypes {
  ADD_CONTACT = '[Contact] Add'
}

export const add = createAction(
  ContactActionTypes.ADD_CONTACT,
  props<{ contact: Contact }>()
);
