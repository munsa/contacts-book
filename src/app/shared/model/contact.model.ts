export class Contact {
  public name: string;
  public surname: string;
  public phone: string;
  public email: string;
  public address: string;

  constructor(name, surname, phone, email, address) {
    this.name = name;
    this.surname = surname;
    this.phone = phone;
    this.email = email;
    this.address = address;
  }
}
