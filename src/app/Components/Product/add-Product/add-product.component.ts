import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/Shared/Models/Category.model';
import { Supplier } from 'src/app/Shared/Models/Supplier.model';
import { CategoryService } from 'src/app/Shared/services/category.service';
import { ProductService } from 'src/app/Shared/services/product.service';
import { SupplierService } from 'src/app/Shared/services/supplier.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  form:FormGroup;
  myForm:FormGroup;
  listCategory : Category[]=[]
  listSupplier : Supplier[]=[]
  isSbmitted:boolean=false;
  isAdedd:boolean;
  ErrorMessage :string;
  ProudctImage :File;
  addCategory :boolean=false;
  addSupplier :boolean=false;
  constructor(private fb : FormBuilder,
    private ProductService:ProductService,
    private router:Router,
    private categoryService : CategoryService,
    private supplierService : SupplierService
    ) { }

  ngOnInit(): void {
   
   this.getCategories();
   this.getSuppliers();
   this.createForm()
   this.buildForm();
   this.myForm.reset();
  }

  getCategories(){
   this.categoryService.getItems().subscribe(data=>{
    this.listCategory = data
   })
  }
  getSuppliers(){
    this.supplierService.getSuppliers().subscribe(data=>{
     this.listSupplier = data
    })
   }
   createForm() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  //handle adding a new operation
  addProduct(){ 
    //prepare product for backend
   let fromdata :FormData= new FormData();
   let product = this.form.value
    delete product.supplier
    product.category = {id:this.form.controls["category"].value,name:""}
    fromdata.append("Supplier",JSON.stringify(this.form.controls["supplier"].value))
    fromdata.append("Product",JSON.stringify( product))
   this.ProductService.addProduct(fromdata).subscribe(data=>{
       this.ConfirmationMessage();
       this.form.reset();
       this.isAdedd=true;
       this.ErrorMessage = "Produit ajouté avec succès"
  },error=>{
    this.ConfirmationMessage();
    this.ErrorMessage = "Il ya un problem dans l'ajouter"
        this.isAdedd=false
  })
  }
  ConfirmationMessage(){
    this.isSbmitted =true;
    setTimeout(()=>{this.isSbmitted =false;},3000)
    
  }

  buildForm(){
    this.form= this.fb.group({
     name : ['',[Validators.required]],
     price : ['',[Validators.pattern("^[0-9]+(\.[0-9]+)?$"),Validators.required]],
     quantityStock : ['',[Validators.pattern("^[0-9]+$"),Validators.required]],
     description : [''],
     category : ['',[Validators.required]],
     supplier : ['',[Validators.required]],
   })
   this.form.reset()
 }

 add() {
  this.categoryService.addItem(this.myForm.value).subscribe(
    res => {
      this.myForm.reset();
       this.getCategories();
    },
    err => {
      console.log(err);
    }
  );
}

refreshSupplier(){
  this.getSuppliers();

}

}
