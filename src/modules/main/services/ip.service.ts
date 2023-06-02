import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private http: HttpClient) { }

  getIPAddress(): Observable<any> {
    return this.http.get("https://ip.andremesquita.com/");
  }

  getIP(): Observable<any> {
    return this.http.get("/api/ip/");
  }
  
}
