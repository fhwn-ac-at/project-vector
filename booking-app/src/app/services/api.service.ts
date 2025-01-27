import { Injectable } from '@angular/core';
import { ServiceEntity } from '../entities/service.entity';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

// Service to communicate with the API
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private static readonly baseUrl = 'http://localhost:8080';
  private token?: string | null;

  constructor(private http: HttpClient, private state: StateService) {
    this.state.token$.subscribe((token) => {
      this.token = token;
    });
  }

  // Get all available services
  getServices(): Observable<ServiceEntity[]> {
    return this.http.get<ServiceEntity[]>(`${ApiService.baseUrl}/api/offers`);
  }

  // Save selected services
  save(date: Date, services: ServiceEntity[]) {
    date.setHours(1); // Resolve issue with timezone by parsing date to string

    const data = {
      notificationToken: this.token,
      date: date.toISOString().split('T')[0],
      data: services.map((s) => ({
        offerId: s.id,
        employeeIds: s.employees.map((e) => e.id),
      })),
    };

    console.log('save data: ', data);
    return this.http.post(
      `${ApiService.baseUrl}/api/appointments/requests`,
      data
    );
  }
}
