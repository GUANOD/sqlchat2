export class Message {
  private _chat: string;
  private _sender_ID: string;
  private _receiver_ID: string;
  private _date: string;

  constructor(
    chat: string,
    senderID: string,
    receiverID: string,
    date: string
  ) {
    this._chat = chat;
    this._sender_ID = senderID;
    this._receiver_ID = receiverID;
    this._date = date;
  }

  public get chat(): string {
    return this._chat;
  }

  public get sender_ID(): string {
    return this._sender_ID;
  }

  public get receiver_ID(): string {
    return this._receiver_ID;
  }

  public get date(): string {
    return this._date;
  }
}
