import {ContactFullNamePipe} from './contact-full-name.pipe';

describe('ContactFullNamePipe', () => {
  const pipe = new ContactFullNamePipe();

  it('should return "Schwarzenegger, Arnold" for the contact Arnold Schwarzenegger', () => {
    expect(pipe.transform({name: 'Arnold', surname: 'Schwarzenegger'})).toBe('Schwarzenegger, Arnold');
  });

  it('should return "Arnold" for the contact Arnold', () => {
    expect(pipe.transform({name: 'Arnold', surname: ''})).toBe('Arnold');
  });
});
