import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-home',
  imports: [HttpClientModule],
  standalone: true,
  providers: [ HttpService ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  timeZone = -(new Date(0)).getTimezoneOffset() * 60000;
  list: any[] = [];
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getCalendarAccess().subscribe({
      next:(calendar: any) => {
        this.list = calendar.map((item: any) => {
          const startTime = new Date(item.start_time - this.timeZone);
          const endTime = new Date(item.end_time - this.timeZone);
          return {
            id: item.id,
            day: item.day,
            startTime: `${startTime.getHours()}:${startTime.getMinutes() > 9 ? "" : '0'}${startTime.getMinutes()}`,
            endTime: `${endTime.getHours()}:${endTime.getMinutes() > 9 ? "" : '0'}${endTime.getMinutes()}`,
          }
        })
      },
      error: error => {
        console.log(error)
      }
    });
  }
}
