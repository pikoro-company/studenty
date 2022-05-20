import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class MatiereService {
  

    BaseURL = "http://localhost:9091/Matiere"

    constructor(private matierehttp: HttpClient) { }
  
  addMatiere(id:any,matiere:any):Observable<any>{
    return this.matierehttp.post(this.BaseURL +"/addMatiere/"+id,matiere);
  }
  getMatByUniversiteId(id:any): Observable<any>{
    return this.matierehttp.get(this.BaseURL +"/getMatByUniversiteId/"+id);
  }
  countMatByUniversiteId(id:any): Observable<any>{
    return this.matierehttp.get(this.BaseURL +"/countMatByUniversiteId/"+id);
  }
  deleteMatiere(id: any): Observable<any> {
    return this.matierehttp.delete(this.BaseURL +"/deleteMatiere/"+id);
  }
 
  }
    

    


  


 

