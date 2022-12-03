import { Customer } from './../Models/Customer.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = 'http://localhost:8098';

  constructor(private http: HttpClient) { }




  getItems(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url + '/customer');
  }


  addItem(item): Observable<any>{
   return this.http.post(this.url + '/customer', item);
  }


  deleteItem(id): Observable<any>{
   return this.http.delete(this.url + '/customer/' + id);
  }


  getById(id): Observable<Customer>{
      return this.http.get<Customer>(this.url + '/customer/' + id);
  }

  updateItem(item, id): Observable<any>{
    return this.http.put(this.url + '/customer/' + id, item);
   }


   getOredrByCustomerId(id): Observable<any>{
     return this.http.get<any>(this.url + '/customer/orders/' + id);
   }

}
