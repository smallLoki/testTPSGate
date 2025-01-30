import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatTimepickerModule, provideNativeDateTimeAdapter } from '@dhutaryan/ngx-mat-timepicker';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-calendar',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatLabel,
    MatTimepickerModule,
    MatInput,
    MatButton,
    HttpClientModule
  ],
  standalone: true,
  providers: [ provideNativeDateTimeAdapter(), HttpService ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  timeZone = -(new Date(0)).getTimezoneOffset() * 60000;
  list: any[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getCalendarRequest().subscribe({
      next:(calendar: any) => {
        this.list = calendar.map((item: any) => {
          return {
            id: item.id,
            day: item.day,
            startTime: new Date(item.start_time - this.timeZone),
            endTime: new Date(item.end_time - this.timeZone)
          }
        })
      },
      error: error => {
        /* TODO
        *   Вывести, что логин/пароль не прошел */
        console.log(error)
      }
    });
  }

  changeCalendarRow(item: any) {
    this.httpService.changeCalendarRequest({
      ...item,
      startTime: item.startTime.getTime() + this.timeZone,
      endTime: item.endTime.getTime() + this.timeZone
    }).subscribe({
      next:(data: any) => {

      },
      error: error => {
        console.log(error)
      }
    });
  }


}
