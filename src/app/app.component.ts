import { Component, OnInit } from '@angular/core';
import { LogInService } from './Shared/services/log-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  constructor(private loginServer : LogInService){

  }
  ngOnInit(): void {
    if(!this.loginServer.currentEmployee){
let user = localStorage.getItem("currentUser")
    this.loginServer.EmployeeSubject.next(JSON.parse(user))
    }
    
  }
}
