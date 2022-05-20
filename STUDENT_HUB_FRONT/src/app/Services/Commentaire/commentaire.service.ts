import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  baseURL = "http://localhost:9091/commentaire"

  constructor(private commentairehttp: HttpClient) { }

  getAllCommentaires(): Observable<any> {
    return this.commentairehttp.get(this.baseURL + "/getAll");
  }

  addCommentaire(idBlog: any, idUser: any, commentaire: any): Observable<any> {
    return this.commentairehttp.post(this.baseURL + "/addCommentaire/" + idBlog + "/" + idUser, commentaire);
  }

  repondreACommentaire(id: any, commentaire: any): Observable<any> {
    return this.commentairehttp.post(this.baseURL + "/Reponse/" + id, commentaire);
  }

  deleteCommentaire(id: any): Observable<any> {
    return this.commentairehttp.delete(this.baseURL + "/deleteCommentaire/" + id);
  }

  updateCommentaire(id: any, commentaire): Observable<any> {
    return this.commentairehttp.put<any>(this.baseURL + "/Update/" + id, commentaire)
  }

  getCommentaireById(id: any): Observable<any> {
    return this.commentairehttp.get(this.baseURL + "/getById/" + id);
  }

  getCommentaireByBlogId(id: any): Observable<any> {
    return this.commentairehttp.get(this.baseURL + "/getByBlogId/" + id);
  }

  countCommentaireByBlogId(id: any): Observable<any> {
    return this.commentairehttp.get(this.baseURL + "/CountCommentaireByBlogId/" + id);
  }

  countCommentaire(): Observable<any> {
    return this.commentairehttp.get(this.baseURL + "/CountCommentaire");
  }

  getReponseByCommentaireId(id: any): Observable<any> {
    return this.commentairehttp.get(this.baseURL + "/getReponseByIdCommentaire/" + id);
  }
}
