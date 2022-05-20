import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  baseURL = "http://localhost:9091/Blog"

  constructor(private bloghttp: HttpClient) { }

  getBlogByUserId(id: any): Observable<any> {
    return this.bloghttp.get<any>(this.baseURL + "/getByUserId/" + id);
  }

  getAllBlog(): Observable<any> {
    return this.bloghttp.get(this.baseURL + "/getAll");
  }

  addBlog(blog: any, id: any): Observable<any> {

    return this.bloghttp.post<any>(this.baseURL + "/addBlog/" + id, blog);
  }

  ajouterBlog(blog: any, id: any): Observable<any> {

    return this.bloghttp.post<any>(this.baseURL + "/ajouterBlog/" + id, blog);
  }

  deleteBlog(id: any): Observable<any> {
    return this.bloghttp.delete(this.baseURL + "/delete/" + id);
  }

  getBlogById(id: any): Observable<any> {
    return this.bloghttp.get<any>(this.baseURL + "/getById/" + id);
  }

  countBlogByIdUser(id: any): Observable<any> {
    return this.bloghttp.get(this.baseURL + "/CountBlogByIdUser/" + id);
  }

  countBlog(): Observable<any> {
    return this.bloghttp.get(this.baseURL + "/CountBlog");
  }

  likeBlog(id: any): Observable<any> {
    return this.bloghttp.put<any>(this.baseURL + "/LikeBlog/" + id, null);
  }
  disLikeBlog(id: any): Observable<any> {
    return this.bloghttp.put<any>(this.baseURL + "/disLikeBlog/" + id, null);
  }

  addImage(file: any, id: any): Observable<any> {
    return this.bloghttp.put<any>(this.baseURL + "/Image/" + id, file);
  }

  masquerBlog(id: any): Observable<any> {
    return this.bloghttp.put(this.baseURL + "/masquer/" + id, null);
  }

  updateBlog(id: any, blog: any): Observable<any> {
    return this.bloghttp.put(this.baseURL + "/update/" + id, blog);
  }

}
