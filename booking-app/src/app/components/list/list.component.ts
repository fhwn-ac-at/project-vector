import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatListModule, MatSelectionList, MatSelectionListChange } from '@angular/material/list';

// Component to display a list with selectable options
@Component({
  selector: 'app-list',
  imports: [MatListModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() options: string[] = [];

  @Output() selectionChanged = new EventEmitter<string[]>();

  @ViewChild("list") list?: MatSelectionList;

  // On selection changed emit all selected options
  onChange() {
    const selected = this.list?.selectedOptions.selected.map(o => o.value);
    this.selectionChanged.emit(selected);
  }
}
