import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/Shared/Models/Employee.model';
import { EmployeeService } from 'src/app/Shared/services/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListEmployeeComponent implements OnInit {
  mode:string ="Ajouter" ;
  listEmployee : Employee[]
  form:FormGroup;
  filter:string =""
  employeeEdit : Employee = new Employee();
  p:number
  constructor(private fb : FormBuilder,private Employeeservice:EmployeeService) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      name : ['',[Validators.pattern("^[a-zA-Z]+$"),Validators.required]],
      password : ['',[Validators.minLength(8),Validators.required]],
      role :["admin",[Validators.required]]
    })
   this.getAllEmployee();
   }
   getAllEmployee(){
     this.Employeeservice.getIEmployees().subscribe(re=>{
      this.listEmployee=re;
    })
   }
   delete(id:number){
     this.Employeeservice.deleteIEmployee(id).subscribe(data=>{
      this.getAllEmployee();
         })
   }
   fill(id:number){
     const Employee = this.listEmployee[id];
     delete Employee.password;
   this.form.patchValue(Employee);
   this.mode= "Modifier"
   this.employeeEdit.id = this.listEmployee[id].id;

   }
   addEmployee(){
    if(this.mode==="Ajouter"){
      this.mode= "Ajouter"
          this.Employeeservice.addEmployee(this.form.value).subscribe(data=>{
            this.getAllEmployee();
      })
      this.vide();
    }else{  
      this.mode= "Ajouter"
      this.employeeEdit = {...this.employeeEdit,...this.form.value}
      this.Employeeservice.updateEmployee(this.employeeEdit).subscribe(data=>{
        this.getAllEmployee();
        console.log("editing")
      })
      this.vide();
    }
   }
   vide(){
     this.form.reset();
     if(this.mode="Modifier"){
        this.mode= "Ajouter"
     }
   }
   pagechangeHandler(evnet : number){
    this.p=evnet;
  }
}
