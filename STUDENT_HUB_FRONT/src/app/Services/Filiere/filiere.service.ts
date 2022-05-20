import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiliereService {

  baseUrl = "http://localhost:9091/Filiere"

  constructor(private filierehttp: HttpClient) { }

  getAll(): Observable<any> {
    return this.filierehttp.get(this.baseUrl + "/getAll");
  }

  addFiliere(filiere: any, id: any): Observable<any> {
    return this.filierehttp.post<any>(this.baseUrl + "/addFiliere/" + id, filiere);
  }

  deleteFiliere(id: any): Observable<any> {
    return this.filierehttp.delete(this.baseUrl + "/delete/" + id)
  }

  updateFiliere(id: any, filiere: any): Observable<any> {
    return this.filierehttp.put(this.baseUrl + "/Update/" + id, filiere);
  }

  getFiliereByUniversiteId(id: any): Observable<any> {
    return this.filierehttp.get<any>(this.baseUrl + "/getFiliereByUniversiteId/" + id);
  }

  getFiliereById(id: any): Observable<any> {
    return this.filierehttp.get<any>(this.baseUrl + "/getFiliereById/" + id);
  }

  getCountFiliereByUniversiteId(id: any): Observable<any> {
    return this.filierehttp.get<any>(this.baseUrl + "/CountFilierByUniversiteId/" + id);
  }

  getCountFiliere(): Observable<any> {
    return this.filierehttp.get<any>(this.baseUrl + "/CountFilier");
  }
}
