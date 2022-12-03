import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Models/Employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  baseUrl ="http://localhost:8098";


  getIEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseUrl + '/Employees/list')
  }


  addEmployee(item): Observable<any>{
   return this.http.post(this.baseUrl + '/Employee/add', item);
  }


  deleteIEmployee(id: number): Observable<any>{
   return this.http.delete(this.baseUrl + '/Employee/' + id , {responseType:"text",observe:"body"});
  }


  getByEmployeeId(id: number): Observable<Employee>{
      return this.http.get<Employee>(this.baseUrl + '/Employee/' + id);
  }

  updateEmployee(item): Observable<any>{
    return this.http.put(this.baseUrl + '/Employee/update', item,{responseType:"text",observe:"body"});
   }


   
}
