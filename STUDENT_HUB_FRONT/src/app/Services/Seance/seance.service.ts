import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  baseURL = "http://localhost:9091/Seance/"

  constructor(private seancehttp: HttpClient) { }

  addSeance(id: any, seance: any): Observable<any> {
    return this.seancehttp.post(this.baseURL + "AddSeance/" + id, seance);
  }

  getSeanceByUniversiteId(id: any): Observable<any> {
    return this.seancehttp.get(this.baseURL + "getByIdUniversite/" + id);
  }

  getSeanceByClassId(id: any): Observable<any> {
    return this.seancehttp.get(this.baseURL + "getByIdClass/" + id);
  }
}
