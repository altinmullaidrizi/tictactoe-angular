import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button nbButton outline status="info" *ngIf="!value">{{ value }}</button>
    <button nbButton outline status="warning" *ngIf="value === 'X'">{{ value }}</button>
    <button nbButton outline status="success" *ngIf="value === 'O'">{{ value }}</button>

  `,
  styles: [
    `button {
      width: 200px;
      height: 200px;
      cursor: pointer;
      font-size: 44px !important;
    }

    button:focus {
      outline: none !important;
      box-shadow: none !important;
      background-color: rgba(0, 149, 255, 0.08) !important;
    }
    `
  ]
})
export class SquareComponent {

  @Input() value: 'X' | 'O' | any;

}
