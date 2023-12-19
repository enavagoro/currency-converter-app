import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
@Injectable({
    providedIn: 'root'
})
export class ConvertService {
    private url: string = 'http://localhost:5100';

    constructor(private http: HttpClient, private storageService: StorageService) {
    }

    convert(amount: number, conversionDate: Date){
        const session = this.storageService.getItem('session')
        const userId = session.userId
        const body = {
            amount,
            conversionDate,
            userId: userId
        }
        return this.http.post<any[]>(`${this.url}/conversion/`, body, {
          headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
        });
    }

    list(){
        return this.http.get<any[]>(`${this.url}/conversion/`)
    }
}