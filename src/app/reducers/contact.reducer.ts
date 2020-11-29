import { createReducer, on } from '@ngrx/store';
import { add } from '../actions/contact.actions';
import {Contact} from '../shared/model/contact.model';

export const initialState: Contact[] = [
  {
    id: '0',
    name: 'Marc',
    surname: 'Monserrat',
    phone: '699849644',
    email: 'mmonserrat90@gmail.com',
    address: 'Speckbachergasse 32/6-7, 1160 Vienna'
  },
  {
    id: '1',
    name: 'Victor',
    surname: 'Dueso',
    phone: '676989832',
    email: 'vdueso@hpaz.com',
    address: 'Calle Pez 43 1º 2ª, 28004 Madrid'
  },
  {
    id: '2',
    name: 'Alex',
    surname: 'Gonzalez',
    phone: '694837263',
    email: 'alegontri@hotmail.com',
    address: 'Carrer Diputació 106 3-1, 08015 Barcelona'
  }
];

const _contactReducer = createReducer(
  initialState,
  on(add, (state, payload) => {
    return [...state, payload.contact]
  }),
);

export function contactReducer(state, action) {
  return _contactReducer(state, action);
}
