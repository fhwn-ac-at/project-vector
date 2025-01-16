import { Injectable } from '@angular/core';
import { ServiceEntity } from '../entities/service.entity';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Service to communicate with the API
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private static readonly baseUrl = "http://192.168.0.45:8080"; // TODO define base URL

  constructor(private http: HttpClient) {
  }

  // Get all available services
  getServices(): Observable<ServiceEntity[]> {
    return this.http.get<ServiceEntity[]>(`${ApiService.baseUrl}/api/offers`);
  }

  // Save selected services
  saveSelectedServices(services: ServiceEntity[]) {
    // TOOD save services
  }
}
