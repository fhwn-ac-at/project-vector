import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

// Default component to display a page with title and content
@Component({
  selector: 'app-page',
  imports: [ButtonComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  @Input() title?: string;
  @Input() hideBack = false;
  @Input() hideNext = false;
  @Input() disableBack = false;
  @Input() disableNext = true;

  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
