import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/Shared/services/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  form:FormGroup;
  errorMessage:string="";
  isAdedd:boolean=false;
  ErrorMessage:string;
 @Output() emitteSupplierAdd : EventEmitter<String> = new  EventEmitter<String>()

  constructor(private fb : FormBuilder,private supplierService:SupplierService) { }
  ngOnInit(): void {
    
    this.form= this.fb.group({
      firstname : ['',[Validators.pattern("^[a-zA-Z]+$"),Validators.required]],
      lastname : ['',[Validators.pattern("^[a-zA-Z]+$"),Validators.required]],
      email : ['',[Validators.email,Validators.required]],
      phone : ['',[Validators.pattern('^[0-9]{10}$'),Validators.required]],
      address: ['',Validators.required],
    })
  }
  addsupplier(){
    this.errorMessage = "";
      if(this.form.invalid){
        if(this.form.controls["firstname"].invalid){
          this.errorMessage+= "Prenom, ";
        }
        if(this.form.controls["lastname"].invalid){
          this.errorMessage += "Nom, ";
        }
        if(this.form.controls["email"].invalid){
          this.errorMessage += "E-mail, ";
        }
        if(this.form.controls["phone"].invalid){
          this.errorMessage += "Teli, ";
        }
        if(this.form.controls["address"].invalid){
          this.errorMessage += "address, ";
        }
        this.errorMessage += " Est invalid";
        return;
      }
  this.supplierService.addSupplier(this.form.value).subscribe(data=>{
    this.ConfirmationMessage();
    this.form.reset();
    this.ErrorMessage = "fournisseur ajouter avec ssucce";
    this.emitteSupplierAdd.emit("added")
    console.log("emitted")

  },error=>{
    this.ConfirmationMessage();
    this.ErrorMessage = "Problem dans l'ajoute de fournisseur"
  })
  }
  ConfirmationMessage(){
    this.isAdedd =true;
    setTimeout(()=>{this.isAdedd =false;},3000)
    
  }

}
