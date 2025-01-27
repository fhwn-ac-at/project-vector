import { Injectable } from '@angular/core';
import { ServiceEntity } from '../entities/service.entity';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private messageSubject = new BehaviorSubject<{ startTime: string, endTime: string } | null>(null);
  private selectedServicesSubject = new BehaviorSubject<ServiceEntity[]>([]);

  token$ = this.tokenSubject.asObservable();
  message$ = this.messageSubject.asObservable();
  selectedServices$ = this.selectedServicesSubject.asObservable();

  // Update token in the state
  setToken(token: string | null) {
    this.tokenSubject.next(token);
  }

  // Update received message in the state
  setMessage(message: { startTime: string, endTime: string } | null) {
    this.messageSubject.next(message);
  }

  // Update selected services in the state
  setSelectedServices(services: ServiceEntity[]) {
    this.selectedServicesSubject.next(services);
  }
}
