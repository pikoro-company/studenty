import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  baseUrl = "http://localhost:9091/Specialite"

  constructor(private specialitehttp: HttpClient) { }

  addSpecialite(filiere: any, id: any): Observable<any> {
    return this.specialitehttp.post<any>(this.baseUrl + "/addSpecialite/" + id, filiere);
  }

  getAllSpecialite(): Observable<any> {
    return this.specialitehttp.get(this.baseUrl + "/getAll");
  }

  updateSpecialite(id: any, specialite: any): Observable<any> {
    return this.specialitehttp.put<any>(this.baseUrl + "/Update/" + id, specialite);
  }

  deleteSpecialite(id: any): Observable<any> {
    return this.specialitehttp.delete(this.baseUrl + "/delete/" + id);
  }

  getSpecialiteByFiliereId(id: any): Observable<any> {
    return this.specialitehttp.get<any>(this.baseUrl + "/getSpecialiteByFiliereId/" + id);
  }

  getSpecialiteById(id: any): Observable<any> {
    return this.specialitehttp.get<any>(this.baseUrl + "/getSpecialiteById/" + id);
  }

  getCountSpecialiteeByFiliereId(id: any): Observable<any> {
    return this.specialitehttp.get<any>(this.baseUrl + "/CountSpecialiteByIdFiliere/" + id);
  }

  getCountSpecialitee(): Observable<any> {
    return this.specialitehttp.get<any>(this.baseUrl + "/CountSpecialite/");
  }

}
