import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Shared/Models/Products.model';
import { Supplier } from 'src/app/Shared/Models/Supplier.model';
import { ProductService } from 'src/app/Shared/services/product.service';
import { SupplierService } from 'src/app/Shared/services/supplier.service';

@Component({
  selector: 'app-produt-details',
  templateUrl: './produt-details.component.html',
  styleUrls: ['./produt-details.component.css']
})
export class ProdutDetailsComponent implements OnInit {

  constructor(private productService : ProductService,
    private activeRoute:ActivatedRoute,
    private supplierService: SupplierService
    ) { }
  product : Product = new Product();
  SupplierList:Supplier[]=[]
  ngOnInit(): void {
    let id = +this.activeRoute.snapshot.paramMap.get("id")
   this.getProudct(id);
   this.SuppliersByProudctId(id);

  }
      getProudct(id:number){
    this.productService.getByProductId(id).subscribe(data=>{
      this.product=data
    })
    
  }
    SuppliersByProudctId(id:number){
      this.supplierService.SuppliersByProudctId(id).subscribe(data=>{
       this.SupplierList=data
      })
    }
}
