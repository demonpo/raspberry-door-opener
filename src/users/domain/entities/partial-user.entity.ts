export class PartialUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;

  constructor({
    id,
    firstName,
    lastName,
    email,
    password,
  }: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    refreshToken?: string;
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
