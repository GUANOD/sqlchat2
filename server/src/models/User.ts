import { v4 as uuidv4 } from "uuid";

export class User {
  private _id: string;
  private _username: string;
  private _password: string;

  constructor(username: string, password: string) {
    this._username = username;
    this._password = password;
    this._id = uuidv4();
  }

  public get getId() {
    return this._id;
  }

  public get getUsername() {
    return this._username;
  }

  public get getPassword() {
    return this._password;
  }

  public set setId(id: string) {
    this._id = id;
  }

  public set setUsername(username: string) {
    this._username = username;
  }

  public set setPassword(password: string) {
    this._password = password;
  }
}
