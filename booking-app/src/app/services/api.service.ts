import { Injectable } from '@angular/core';
import { ServiceEntity } from '../entities/service.entity';

// Service to communicate with the API
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private static readonly baseUrl = ""; // TODO define base URL

  constructor() { }

  // Get all available services
  getServices(): Promise<ServiceEntity[]> {
    // TODO implement actual connection
    return Promise.resolve([
      new ServiceEntity("Haare schneiden", 20),
      new ServiceEntity("Haare waschen", 10),
      new ServiceEntity("Haare föhnen", 15),
      new ServiceEntity("Haare färben", 50),
    ]);
  }

  // Save selected services
  saveSelectedServices(services: ServiceEntity[]) {
    // TOOD save services
  }
}
