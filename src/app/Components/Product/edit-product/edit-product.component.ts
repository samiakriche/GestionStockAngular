import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/Shared/Models/Category.model';
import { Supplier } from 'src/app/Shared/Models/Supplier.model';
import { CategoryService } from 'src/app/Shared/services/category.service';
import { ProductService } from 'src/app/Shared/services/product.service';
import { SupplierService } from 'src/app/Shared/services/supplier.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  form:FormGroup;
  listCategory : Category[]=[]
  id :number;
  isAdedd: boolean=false;
  ErrorMessage:string
  listSupplier : Supplier[]=[]
  isSbmitted:boolean=false;
  constructor(private fb:FormBuilder,private activeRoute:ActivatedRoute,
    private router:Router ,
    private ProductService:ProductService,
    private categoryService : CategoryService,
    private supplierService : SupplierService
    ) { }

  ngOnInit(): void {
    this.getCategories();
    this.id = +this.activeRoute.snapshot.paramMap.get("id")
    this.getProduct(this.id) 
    this.buildForm();
   
  }


  getProduct(id:number){
    this.ProductService.getByProductId(id).subscribe(data=>{
     this.form.patchValue(data);
     this.form.controls["category"].setValue(data.category.id)
    })
  }
  getCategories(){
    this.categoryService.getItems().subscribe(data=>{
     this.listCategory = data
    })
   }
  
  updateProduct(){
    let product = {id : this.id ,...this.form.value,category:{id:this.form.controls["category"].value,name:""}};
     console.log(product)
   this.ProductService.updateProduct(product).subscribe(data=>{
    this. ConfirmationMessage();
      this.isAdedd =true;
    this.ErrorMessage="Produit modifier avec ssucces"
   },error=>{
     console.log(error)
    this. ConfirmationMessage();
      this.isAdedd =false;
    this.ErrorMessage="Un problem dans modification"
   })
  }
      cancel(){
          this.router.navigate(["/home/products"])
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
       })
     }

  }

