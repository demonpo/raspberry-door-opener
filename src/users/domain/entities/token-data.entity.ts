export class TokenData {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;

  constructor({
    sub,
    email,
    firstName,
    lastName,
  }: {
    sub: string;
    email: string;
    firstName: string;
    lastName: string;
  }) {
    this.sub = sub;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
