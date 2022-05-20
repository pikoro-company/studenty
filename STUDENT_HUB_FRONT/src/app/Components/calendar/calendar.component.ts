import { Component, OnInit } from '@angular/core';
import { SeanceService } from 'src/app/Services/Seance/seance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Event } from 'src/app/Models/Event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})

export class CalendarComponent implements OnInit {

  events: any;

  constructor(private seanceservice: SeanceService) { }

  ngOnInit(): void {
    this.getSeanceByUniversiteId();
  }

  getSeanceByUniversiteId() {
    this.seanceservice.getSeanceByUniversiteId(localStorage.getItem("Id")).subscribe(
      data => {
        this.events = data;
        return this.events;
      }
    )
  }
}
