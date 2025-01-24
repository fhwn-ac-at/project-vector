import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private messaging: AngularFireMessaging, private state: StateService) { }

  requestPermission() {
    this.messaging.requestToken
      .subscribe({
        next: (token) => {
          console.log('Permission granted to receive messages!');
          this.state.setToken(token);
        },
        error: (error) => console.error(error),
      });
  }

  receiveMessage() {
    this.messaging.messages
      .subscribe((message) => { console.log('Message received. ', message); });
  }
}
