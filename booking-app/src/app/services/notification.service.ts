import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private swPush: SwPush) { }

  requestPermission(): void {
    this.swPush.requestSubscription({
      serverPublicKey: ''
    })
      .then(subscription => {
        // Sende das Abonnement an deinen Server 
        console.log('Subscription:', subscription);
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
