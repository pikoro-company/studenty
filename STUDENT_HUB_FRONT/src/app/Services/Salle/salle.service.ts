import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  baseURL = "http://localhost:9091/Salle"

  constructor(private sallehttp: HttpClient) { }

  addSalle(id: any, salle: any): Observable<any> {
    return this.sallehttp.post(this.baseURL + "/addSalle/" + id, salle);
  }

  getSalleByUniversiteId(id: any): Observable<any> {
    return this.sallehttp.get(this.baseURL + "/getSallByUniversiteId/" + id);
  }

  countSalleByUniversiteId(id: any): Observable<any> {
    return this.sallehttp.get(this.baseURL + "/countSallByUniversiteId/" + id)
  }

  deleteSalle(id: any): Observable<any> {
    return this.sallehttp.delete(this.baseURL + "/deleteSalle/" + id);
  }
  
}
