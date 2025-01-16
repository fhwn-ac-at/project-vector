import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'booking-app';

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    // TODO implement notification service
    // this.notificationService.requestPermission();
  }
}
