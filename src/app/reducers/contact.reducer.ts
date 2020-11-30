import {createReducer, on} from '@ngrx/store';
import {add} from '../actions/contact.actions';
import {Contact} from '../shared/model/contact.model';

export const initialState: Contact[] = [];

const _contactReducer = createReducer(
  initialState,
  on(add, (state, payload) => {
    return [...state, payload.contact];
  })
);

export function contactReducer(state, action) {
  return _contactReducer(state, action);
}
