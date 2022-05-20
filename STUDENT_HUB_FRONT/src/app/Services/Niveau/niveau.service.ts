import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  baseUrl = "http://localhost:9091/Niveau"

  constructor(private niveauhttp: HttpClient) { }

  getAllNiveau(): Observable<any> {
    return this.niveauhttp.get(this.baseUrl + "/getAll");
  }

  addNiveau(niveau: any, id: any): Observable<any> {
    return this.niveauhttp.post<any>(this.baseUrl + "/addNiveau/" + id, niveau);
  }

  updateNiveau(id: any, niveau: any): Observable<any> {
    return this.niveauhttp.put<any>(this.baseUrl + "/Update/" + id, niveau);
  }

  deleteNiveau(id: any): Observable<any> {
    return this.niveauhttp.delete<any>(this.baseUrl + "/delete/" + id);
  }

  getNiveauBySpecialiteId(id: any): Observable<any> {
    return this.niveauhttp.get<any>(this.baseUrl + "/getNiveauByIdSpecialite/" + id);
  }

  getNiveauById(id: any): Observable<any> {
    return this.niveauhttp.get<any>(this.baseUrl + "/getNiveauById/" + id);
  }

  getCountNiveauBySpecialiteId(id: any): Observable<any> {
    return this.niveauhttp.get<any>(this.baseUrl + "/CountNiveauByIdSpecialite/" + id);
  }

  getCountNiveau(): Observable<any> {
    return this.niveauhttp.get<any>(this.baseUrl + "/CountNiveau");
  }

}
