import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface auth {
  accessToken : string;
  refreshToken : string;
  userId : string;
  isAdmin : boolean;
}

@Injectable()

export class AuthService {
  private isAdmin: boolean = false;
  private userId: string = '';
  private url: string = 'https://currency-converter-api-hh5fq.ondigitalocean.app';

  constructor(private http: HttpClient) { }

  logUser(userInfo: Object){
    return this.http.post<auth>(`${this.url}/auth/`, userInfo, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  setAdminBoolean(){
    this.isAdmin = true;
  }

  getIsAdmin(){
    return this.isAdmin
  }

  setUserId(userId: string){
    this.userId = userId;
  }

  getUserId(){
    return this.userId
  }
}
