class Message {
  private _chat: string;
  private _senderID: string;
  private _receiverID: string;
  private _date: Date;

  constructor(chat: string, senderID: string, receiverID: string, date: Date) {
    this._chat = chat;
    this._senderID = senderID;
    this._receiverID = receiverID;
    this._date = date;
  }

  public get chat(): string {
    return this._chat;
  }

  public get senderID(): string {
    return this._senderID;
  }

  public get receiverID(): string {
    return this._receiverID;
  }

  public get date(): Date {
    return this._date;
  }
}
