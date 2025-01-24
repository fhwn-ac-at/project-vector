import { Injectable, OnInit } from '@angular/core';
import { Messaging } from '@angular/fire/messaging';
import { StateService } from './state.service';
import { getToken, onMessage } from 'firebase/messaging';

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

    // Get current FCM token
    getToken(this.messaging).then((token) => {
      console.log('Token: ', token);
      this.state.setToken(token);
    }).catch((error) => console.log('Error receiving token', error));

    onMessage(this.messaging, {
      next: (payload) => {
        console.log('Message received', payload);
        // TODO display
      },
      error: (error) => console.log('Error receiving message', error),
      complete: () => console.log('Done listening to messages')
    });
  }
}
