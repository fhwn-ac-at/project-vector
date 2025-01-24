import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideHttpClient(),
  provideRouter(routes), provideAnimationsAsync(), provideNativeDateAdapter(), provideServiceWorker('ngsw-worker.js', {
    enabled: !isDevMode(),
    registrationStrategy: 'registerWhenStable:30000'
  }),
  provideFirebaseApp(() => initializeApp({
    apiKey: "AIzaSyAy5yYk8kphsK0s34BUev23PV8lubiUS6k",
    authDomain: "vector-d2098.firebaseapp.com",
    projectId: "vector-d2098",
    storageBucket: "vector-d2098.firebasestorage.app",
    messagingSenderId: "1057153687079",
    appId: "1:1057153687079:web:35a651054ee8670c9cf802"
  }))]
};
