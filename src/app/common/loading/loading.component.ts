import {Component} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})

export class LoadingComponent {
  private _visible: boolean;
  private _text: string;

  constructor() {
    this._visible = false;
    this._text = '';
  }

  get text(): string {
    return this._text;
  }

  get visible(): boolean {
    return this._visible;
  }

  show(text: string): void {
    this._text = text;
    this._visible = true;
  }

  hide(): void {
    this._visible = false;
  }
}
