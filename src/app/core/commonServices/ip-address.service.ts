import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpAddressService {

  constructor(private httpClient: HttpClient) { }

  getClientIpAddress(){
    const url: string = "https://api.ipify.org/?format=json";
    return this.httpClient.get<any>(url);
  }
}

