import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected static _headers: HttpHeaders = new HttpHeaders()
    .set("Accept", "application/json");
  protected static _token: string = "";
  protected static _authStatus: boolean = false;

  constructor() {
    this.getToken();
  }

  public setToken(data: any): void {
    AuthService._token = data.token ?? "";
    localStorage.setItem("test_data", JSON.stringify(data));
    let headers: HttpHeaders = new HttpHeaders()
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + data.token);
    AuthService._headers = headers;
  }

  public removeToken(): void {
    localStorage.removeItem("test_data");
    AuthService._authStatus = false;
  }

  public getToken() {
    if (AuthService._token.length == 0) {
      const auth = localStorage.getItem("test_data");
      if (auth && auth.length > 0) {
        let data = JSON.parse(auth);
        AuthService._token = data.token ?? "";
        let headers: HttpHeaders = new HttpHeaders()
          .set("Accept", "application/json")
          .set("Authorization", "Bearer " + data.token);
        AuthService._headers = headers;
        AuthService._authStatus = true;
      }
    }
  }

  get headers(): HttpHeaders {
    return AuthService._headers;
  }

  set headers(value: HttpHeaders) {
    AuthService._headers = value;
  }

  get authStatus(): boolean {
    return AuthService._authStatus;
  }

  getAuthStatus(): boolean {
    return AuthService._authStatus;
  }

  set authStatus(value: boolean) {
    AuthService._authStatus = value;
  }

  get token(): string {
    return AuthService._token;
  }

  set token(value: string) {
    AuthService._token = value;
  }
}
