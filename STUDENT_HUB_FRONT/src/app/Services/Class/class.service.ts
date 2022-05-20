import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  baseUrl = "http://localhost:9091/Class"

  constructor(private classhttp: HttpClient) { }

  getAllClass(): Observable<any> {
    return this.classhttp.get(this.baseUrl + "/getAll");
  }

  addClass(classe: any, id: any): Observable<any> {
    return this.classhttp.post<any>(this.baseUrl + "/addClass/" + id, classe);
  }

  updateClass(id: any, classe): Observable<any> {
    return this.classhttp.put(this.baseUrl + "/Update/" + id, classe);
  }

  deleteClass(id: any): Observable<any> {
    return this.classhttp.delete(this.baseUrl + "/delete/" + id);
  }

  getClassByNiveauId(id: any): Observable<any> {
    return this.classhttp.get<any>(this.baseUrl + "/getClassByNiveauId/" + id);
  }

  getClassById(id: any): Observable<any> {
    return this.classhttp.get<any>(this.baseUrl + "/getClassById/" + id);
  }

  getCountClassByNiveauId(id: any): Observable<any> {
    return this.classhttp.get<any>(this.baseUrl + "/CountClassByNiveauId/" + id);
  }

  getCountClass(): Observable<any> {
    return this.classhttp.get<any>(this.baseUrl + "/CountClass");
  }
}
