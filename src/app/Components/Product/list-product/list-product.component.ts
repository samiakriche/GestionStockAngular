import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/Shared/Models/Products.model';
import { Supplier } from 'src/app/Shared/Models/Supplier.model';
import { ProductService } from 'src/app/Shared/services/product.service';
import { SupplierService } from 'src/app/Shared/services/supplier.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ListProductComponent implements OnInit {
  Supplying : number =0  ;
  listProduct: Product[]=[];
  listSupplier:Supplier[]=[];
  p: number;
  filter:string = "";
  myForm : FormGroup;
  constructor(private router:Router , private ProductService:ProductService,
    private supplierService : SupplierService,
    private fb : FormBuilder
    ) { }
  ngOnInit(): void {
    this.getAllProcut();
    this.createForm();
  }

  getAllProcut(){
     this.ProductService.getProducts().subscribe(data=>{
       this.listProduct = data;
     })
  }

  delete(idProduct:number){
    this.ProductService.deleteProduct(idProduct).subscribe(data=>{
     this.getAllProcut();
    })
  }
  pagechangeHandler(evnet : number){
    this.p=evnet;
  }
  getSuppliers(){
    this.supplierService.getSuppliers().subscribe(data=>{
     this.listSupplier = data
    })
   }
   createForm() {
    this.myForm = this.fb.group({
      price: ['', [Validators.pattern("^[0-9]+(\.[0-9]+)?$"),Validators.required]],
      Quantity: ['', [Validators.pattern("^[0-9]+$"),Validators.required]],
      supplier: ['', [Validators.required]]
    });
  }
  SupplyingProduct(id: number) {
    this.Supplying  = id;
    this.Supplying && this.getSuppliers();
  }

  Supply(){
    const supplier = this.listSupplier.find(x=>x.id==this.myForm.controls["supplier"].value)
    const product = this.listProduct.find(x=>x.id===this.Supplying)
    const supplyProduct = { product : product ,supplier:supplier ,price :+this.myForm.controls["price"].value,quantity :+this.myForm.controls["Quantity"].value }
    this.supplierService.Supply(supplyProduct).subscribe(d=>{
      this.getAllProcut();
      this.myForm.reset();
          }
          
          )
    this.Supplying  = 0;
  }

}
