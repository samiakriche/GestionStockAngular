import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = ' http://localhost:8098';

  constructor(private http: HttpClient) { }
  getItems(): Observable<any>{
    return this.http.get<any>(this.url + '/category');
  }


  addItem(item): Observable<any>{
   return this.http.post(this.url + '/category', item);
  }


  deleteItem(id): Observable<any>{
   return this.http.delete(this.url + '/category/' + id, {responseType : "text"});
  }


}
