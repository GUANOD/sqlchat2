class Message {
  private _chat: string;
  private _senderID: string;
  private _receiverID: string;

  constructor(chat: string, senderID: string, receiverID: string) {
    this._chat = chat;
    this._senderID = senderID;
    this._receiverID = receiverID;
  }

  public get chat(): string {
    return this._chat;
  }

  public set chat(value: string) {
    this._chat = value;
  }

  public get senderID(): string {
    return this._senderID;
  }

  public set senderID(value: string) {
    this._senderID = value;
  }

  public get receiverID(): string {
    return this._receiverID;
  }

  public set receiverID(value: string) {
    this._receiverID = value;
  }
}
