import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'collapsible-well',
  template: `
    <div (click)="toggleContent()" class="well pointable">
      <h4>
        <ng-content select="[well-title]"></ng-content>
      </h4>
      <ng-content *ngIf="visible" select="[well-body]"></ng-content>
    </div>
  `,
  styles: [],
})
export class CollapsibleWellComponent {
  visible = true;

  // @Input() title: string;

  toggleContent() {
    this.visible = !this.visible;
  }
}
