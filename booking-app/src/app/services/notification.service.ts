import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { getToken, Messaging, onMessage } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private messaging: Messaging, private state: StateService) { }

  init(): void {
    // Request permission to receive notifications
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    });

    // Register service worker
    navigator.serviceWorker.register("/firebase-messaging-sw.js", {
      type: "module",
    }).then((serviceWorkerRegistration) => {
      // Get current FCM token
      getToken(this.messaging, {
        serviceWorkerRegistration: serviceWorkerRegistration,
      }).then((token) => {
        console.log('Token: ', token);
        this.state.setToken(token);
      }).catch((error) => console.log('Error receiving token', error));
    });

    // Listen to incoming messages
    onMessage(this.messaging, {
      next: (payload) => {
        console.log('Message received', payload);
        this.state.setMessage(payload.data as { startTime: string, endTime: string });
      },
      error: (error) => console.log('Error receiving message', error),
      complete: () => console.log('Done listening to messages')
    });
  }
}
