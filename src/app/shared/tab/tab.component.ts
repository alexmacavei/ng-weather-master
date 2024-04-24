import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'my-tab',
  standalone: true,
  imports: [NgIf],
  template: `
    <div *ngIf="active">
      <ng-content></ng-content>
    </div>
  `,
})
export class TabComponent {
  @Input() tabTitle: string;
  @Output() tabClosed = new EventEmitter();

  active: boolean = false;
}
