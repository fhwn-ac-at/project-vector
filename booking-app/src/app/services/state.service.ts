import { Injectable } from '@angular/core';
import { ServiceEntity } from '../entities/service.entity';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private selectedServicesSubject = new BehaviorSubject<ServiceEntity[]>([]);
  selectedServices$ = this.selectedServicesSubject.asObservable();

  // Update selected services in the state
  setSelectedServices(services: ServiceEntity[]) {
    this.selectedServicesSubject.next(services);
  }
}
