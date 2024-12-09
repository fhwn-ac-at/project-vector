import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon'

// Default component to display a page with title and content
@Component({
  selector: 'app-page',
  imports: [
    MatButtonModule, MatIconModule
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  @Input() title?: string;
}
