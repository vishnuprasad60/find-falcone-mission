import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ResultService {
  tokenUrl = 'https://findfalcone.herokuapp.com/token';
  resultUrl = 'https://findfalcone.herokuapp.com/find';
  getToken(): any{
    const httpOptions = {
      headers: new HttpHeaders({
        Accept:  'application/json'
      })
    };
    return this.http.post(this.tokenUrl, null, httpOptions);
  }
  getResult(token1: any, planets: string[], vehicles: string[]): any{
    const obj = {
      token: token1,
      planet_names: planets,
      vehicle_names: vehicles
    };
    const httpOptions = {
      headers: new HttpHeaders({
        Accept:  'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.resultUrl, obj, httpOptions);
  }
  constructor(private http: HttpClient) { }
}
