import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap,map } from 'rxjs/operators';
import { Employee } from '../Models/Employee.model';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
   EmployeeSubject = new BehaviorSubject<Employee>(null);

  constructor(private http:HttpClient) { }  
  baseUrl ="http://localhost:8098";

  public get currentEmployee(): Employee {
    return this.EmployeeSubject.value;
}
  LogIn(logindata ,remember): Observable<any>{
    return this.http.post<any>(this.baseUrl + '/login',logindata,{observe : "response"}).pipe(map(data=>{
      const E = new Employee();
      E.name = data.body.username;
      E.password = data.body.password;
      E.role = data.body.authorities[0].authority
      E.token = data.headers.get("Authorization")
     return E;
    }),tap(data=>{
      this.EmployeeSubject.next(data)
      if(remember){
              localStorage.setItem("currentUser" ,JSON.stringify(data))
      }
    }))
  }

  LogOut(){
    try {
          localStorage.removeItem('currentUser');
    } catch (error) {
      
    }
    this.EmployeeSubject.next(null);
  }

}
