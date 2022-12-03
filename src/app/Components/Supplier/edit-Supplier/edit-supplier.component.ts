import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from 'src/app/Shared/Models/Supplier.model';
import { SupplierService } from 'src/app/Shared/services/supplier.service';
@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})

export class EditSupplierComponent implements OnInit {
    constructor(private fb : FormBuilder,private route:Router,
    private activeRoute:ActivatedRoute, private supplierService:SupplierService) { }
  supplier:Supplier= new Supplier();
  isAdedd : boolean=false;
  ErrorMessage:string;
  form:FormGroup;
  errorMessage:string="";
  id :number;
  ngOnInit(): void {
    this.buildForm();
    this.id = + this.activeRoute.snapshot.paramMap.get("id");
  
    this.getsupplier(this.id);
  }
  buildForm(){
     this.form= this.fb.group({
      firstname : ['',[Validators.pattern("^[a-zA-Z]+$"),Validators.required]],
      lastname : ['',[Validators.pattern("^[a-zA-Z]+$"),Validators.required]],
      email : ['',[Validators.email,Validators.required]],
      phone : ['',[Validators.pattern('^[0-9]{10}$'),Validators.required]],
      address: ['',Validators.required],
    })
  }
  updatesupplier(){
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
      this.errorMessage += " est invalid";
      return;
    }
    let  supplier;
    supplier = {id :this.supplier.id,...this.form.value}
    this.supplierService.updateSupplier(supplier).subscribe(data=>{
     
      this.ConfirmationMessage()
      this.ErrorMessage="fournisseur modifier avec ssucces"
 },error=>{
  this.ConfirmationMessage()
  this.ErrorMessage="Problem dans la modification";
 })
  }

  getsupplier(id:number){
    this.supplierService.getBySupplierId(id).subscribe(data=>{ 
       this.form.patchValue(data)
    })
      
  }
  cancel(){
    this.route.navigate(["/home/suppliers/"])
  }
  ConfirmationMessage(){
    this.isAdedd =true;
    setTimeout(()=>{this.isAdedd =false;},3000)
    
  }

}