import { Injectable } from '@angular/core';

// Service to communicate with the API
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private static readonly baseUrl = ""; // TODO define base URL

  constructor() { }

  getServices(): Promise<string[]> {
    // TODO implement actual connection
    return Promise.resolve([
      "Haare schneiden",
      "Haare waschen",
      "Haare föhnen",
      "Haare färben",
    ]);
  }
}
