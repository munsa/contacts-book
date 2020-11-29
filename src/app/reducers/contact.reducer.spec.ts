import {contactReducer, initialState} from './contact.reducer';
import {Contact} from '../shared/model/contact.model';
import {add} from '../actions/contact.actions';

describe('Contact Reducer', () => {
  it('should return the default state', () => {
    const action = {type: 'NOOP'} as any;
    const result = contactReducer(undefined, action);

    expect(result).toBe(initialState);
  });

  it('it should add a contact', () => {
    const contact = new Contact();
    contact.name = 'Marc';
    contact.surname = 'Monserrat';
    contact.phone = '699849644';
    contact.email = 'mmonserrat90@gmail.com';
    contact.address = 'Speckbachergasse 32/6-7, 1160 Vienna';

    const action = add({ contact: contact });
    const result = contactReducer(initialState, action);

    expect(result).toEqual([contact]);
  });
});
