import { Component, OnInit } from '@angular/core';
import { PageComponent } from "../../components/page/page.component";
import { ServiceEntity } from '../../entities/service.entity';

@Component({
  selector: 'app-confirmation',
  imports: [PageComponent],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
