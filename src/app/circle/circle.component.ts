import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.sass'],
})
export class CircleComponent {
  @Input() clickable = true;
  @Output() clicked = new EventEmitter();

  handleClick() {
    if (this.clickable) {
      this.clicked.emit();
    }
  }
}
