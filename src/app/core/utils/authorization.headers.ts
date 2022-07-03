import { HttpHeaders } from "@angular/common/http";
export function getHttpOptions(){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },)
    };
    return httpOptions;
}