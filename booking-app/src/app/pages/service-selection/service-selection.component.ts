import { Component, OnInit, ViewChild } from '@angular/core';
import { PageComponent } from '../../components/page/page.component';
import { ApiService } from '../../services/api.service';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { ServiceEntity } from '../../entities/service.entity';
import { Router } from '@angular/router';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-service-selection',
  imports: [PageComponent, MatListModule],
  templateUrl: './service-selection.component.html',
  styleUrl: './service-selection.component.css'
})
export class ServiceSelectionComponent implements OnInit {
  @ViewChild("list") list?: MatSelectionList;

  services: ServiceEntity[] = [];
  selectedServices: ServiceEntity[] = [];

  constructor(private api: ApiService, private router: Router, private state: StateService) { }

  ngOnInit(): void {
    this.api.getServices().then((services) =>
      this.services = services
    );
  }

  // On selection changed emit all selected options
  selectionChange() {
    this.selectedServices = this.list?.selectedOptions.selected.map(o => o.value) ?? [];
  }

  // Send selection and navigate to the next page
  next() {
    this.state.setSelectedServices(this.selectedServices);
    this.router.navigate(["/confirmation"]);
  }
}
