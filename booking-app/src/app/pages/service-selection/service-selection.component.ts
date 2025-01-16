import { Component, OnInit, ViewChild } from '@angular/core';
import { PageComponent } from '../../components/page/page.component';
import { ApiService } from '../../services/api.service';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { ServiceEntity } from '../../entities/service.entity';
import { Router } from '@angular/router';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-service-selection',
  imports: [PageComponent, MatListModule, MatSelectModule],
  templateUrl: './service-selection.component.html',
  styleUrl: './service-selection.component.css'
})
export class ServiceSelectionComponent implements OnInit {
  @ViewChild("list") list?: MatSelectionList;

  services: ServiceEntity[] = [];
  selectedServices: ServiceEntity[] = [];

  // Default employee option
  readonly anyEmployeeOption: string = "Beliebiger Mitarbeiter";
  selectedEmployeeId: string = this.anyEmployeeOption;

  constructor(private api: ApiService, private router: Router, private state: StateService) { }

  ngOnInit(): void {
    this.api.getServices().subscribe((services) => {
      console.log(services);
      this.services = services;
    });

    this.services = [
      {
        id: "1",
        name: "Haarschnitt",
        price: 20,
        employees: [
          { id: "2", name: "Max Mustermann" },
        ]
      }
    ]
  }

  // On selection changed emit all selected options
  selectionChange() {
    this.selectedServices = this.list?.selectedOptions.selected.map(o => o.value) ?? [];
  }

  onEmplyoeeSelection(event: Event) {
    event.stopPropagation();
  }

  // Send selection and navigate to the next page
  next() {
    this.state.setSelectedServices(this.selectedServices);
    this.router.navigate(["/confirmation"]);
  }
}
