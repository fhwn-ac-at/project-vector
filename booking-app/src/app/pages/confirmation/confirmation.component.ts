import { Component, OnInit } from '@angular/core';
import { PageComponent } from "../../components/page/page.component";
import { ServiceEntity } from '../../entities/service.entity';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-confirmation',
  imports: [PageComponent],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit {
  selectedServices: ServiceEntity[] = [];
  message?: { startTime: string, endTime: string } | null;

  constructor(private state: StateService) { }

  ngOnInit(): void {
    this.state.selectedServices$.subscribe((services) => {
      this.selectedServices = services;
    });

    this.state.message$.subscribe((msg) => {
      this.message = msg;
    });
  }
}
