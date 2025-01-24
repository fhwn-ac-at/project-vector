import { Injectable } from '@angular/core';
import { ServiceEntity } from '../entities/service.entity';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Service to communicate with the API
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private static readonly baseUrl = "http://192.168.0.40:8080";

  constructor(private http: HttpClient) {
  }

  // Get all available services
  getServices(): Observable<ServiceEntity[]> {
    return this.http.get<ServiceEntity[]>(`${ApiService.baseUrl}/api/offers`);
  }

  // Save selected services
  save(date: Date, services: ServiceEntity[]) {
    return this.http.post(`${ApiService.baseUrl}/api/appointments/requests`, {
      "date": date.toISOString().split('T')[0],
      "data": services.map(s => ({ "offerId": s.id, "employeeIds": s.employees.map(e => e.id) }))
    });
  }
}
