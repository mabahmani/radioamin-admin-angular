export class Alert {
  constructor(private _message: string, private _title: string) {
    this._message = _message;
    this._title = _title;
  }


  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
