import { Component } from '@angular/core';
import { PageComponent } from '../../components/page/page.component';
import { ListComponent } from "../../components/list/list.component";

@Component({
  selector: 'app-service-selection',
  imports: [PageComponent, ListComponent],
  templateUrl: './service-selection.component.html',
  styleUrl: './service-selection.component.css'
})
export class ServiceSelectionComponent {
  services: string[] = [
    "Haare schneiden",
    "Haare waschen",
    "Haare föhnen",
    "Haare färben",
  ];

  selectedServices: string[] = [];
}
