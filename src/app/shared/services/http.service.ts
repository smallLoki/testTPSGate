import { Injectable } from '@angular/core';
import { map } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { URL } from "../templates/static.data"
import { AuthService } from "./auth/auth.service";



@Injectable()

export class HttpService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Авторизация
  loginRequest(loginData: any) {
    return this.http.post(`${URL}/login`, loginData, {
      headers: this.authService.headers,
      observe: 'response'
    }).pipe(
      map((data: any) => {
        const { body } = data;
        if (data.status === 200) {
          const { data, auth } = body;
          this.authService.setToken(body); // @ts-ignore
          this.authService.authStatus = true;
          return { data, auth };
        } else { // @ts-ignore
          this.authService.authStatus = false;
          return {auth: false};
        }
      }),
    );
  }

  // Календарь
  getCalendarRequest() {
    return this.http.get(`${URL}/calendar`, {
      headers: this.authService.headers,
      observe: 'response'
    }).pipe(
      map((data: any) => {
        const { body } = data;
        if (data.status === 200) {
          const { calendar } = body;
          return calendar;
        }
      }),
    );
  }

  // Обновить календарь
  changeCalendarRequest(body: any) {
    return this.http.post(`${URL}/calendar`, body, {
      headers: this.authService.headers,
      observe: 'response'
    }).pipe(
      map((body: any) => {
        const { calendar } = body;
        return calendar;
      }),
    );
  }

  // Получить календарь
  getCalendarAccess() {
    return this.http.get(`${URL}`, {
      headers: this.authService.headers,
      observe: 'response'
    }).pipe(
      map((data: any) => {
        const { calendar } = data.body;
        return calendar;
      }),
    );
  }

}
