import { Component, OnInit, ViewChild } from '@angular/core';
import { PageComponent } from '../../components/page/page.component';
import { ApiService } from '../../services/api.service';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ServiceEntity } from '../../entities/service.entity';
import { Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { dateValidator } from './date-validator';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-service-selection',
  imports: [PageComponent, MatListModule, MatSelectModule, MatDatepickerModule,
    MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './service-selection.component.html',
  styleUrl: './service-selection.component.css'
})
export class ServiceSelectionComponent implements OnInit {
  @ViewChild("list") list?: MatSelectionList;

  date = new FormControl<Date>(new Date(), [dateValidator()]);
  services: ServiceEntity[] = [];
  selectedServiceIds: string[] = [];

  // Default employee option
  readonly anyEmployeeOption: string = "Beliebiger Mitarbeiter";
  selectedEmployeeIds: Map<string, string> = new Map();

  constructor(private api: ApiService, private router: Router, private state: StateService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('de-DE');
  }

  ngOnInit(): void {
    this.api.getServices().subscribe((services) => {
      console.log(services);
      this.services = services;

      // Init employee selection fields
      for (const service of services)
        this.selectedEmployeeIds.set(service.id!, this.anyEmployeeOption);
    });
  }

  // Get error message for date field
  getDateErrorMessage() {
    return this.date.hasError('invalidDate') ? 'Das Datum ist ungültig!' :
      '';
  }

  // On selection changed emit all selected options
  selectionChange() {
    this.selectedServiceIds = this.list?.selectedOptions.selected.map(s => s.value) ?? [];
  }

  onEmplyoeeSelection(id: string, event: MatSelectChange) {
    this.selectedEmployeeIds.set(id, event.value);
  }

  // Send selection and navigate to the next page
  next() {
    if (this.date.invalid)
      return;

    const selectedServices: ServiceEntity[] = [];

    // Build selected services
    for (const service of this.services) {
      if (this.selectedServiceIds.includes(service.id!)) {
        const selectedService = new ServiceEntity(service.id!, service.name!, service.price!);

        // Add selected employees
        if (this.selectedEmployeeIds.get(service.id!) === this.anyEmployeeOption)
          selectedService.employees = service.employees;
        else
          selectedService.employees.push(service.employees.find(e => e.id === this.selectedEmployeeIds.get(service.id!))!);

        selectedServices.push(selectedService);
      }
    }


    this.state.setSelectedServices(selectedServices);
    this.api.save(this.date.value!, selectedServices)
      .subscribe(() => console.log("Saved successfully"));
    this.router.navigate(["/confirmation"]);
  }
}
