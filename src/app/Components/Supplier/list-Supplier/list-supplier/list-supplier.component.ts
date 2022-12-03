import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/Shared/Models/Supplier.model';
import { SupplierService } from 'src/app/Shared/services/supplier.service';
@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.css'],
})
export class ListSupplierComponent implements OnInit {
  listSupplier:Supplier[]=[]
  p:number;
  filter:string="";
  constructor(private route:Router,private supplierService:SupplierService ) { }
  ngOnInit(): void {
    this.getAllSupplier();
  }
  getAllSupplier(){
        this.supplierService.getSuppliers().subscribe(data=>{
          this.listSupplier = data
        })   
  }
  update(idProduct:number){
 this.route.navigate(["/home/supplier/edit/"+idProduct])
  }
  Delete(id:number){
    this.supplierService.deleteSupplier(id).subscribe(data=>{
      this.getAllSupplier();
    })   
  }
  pagechangeHandler(evnet : number){
    this.p=evnet;
  }
  details(idProduct : number){
    this.route.navigate(["/home/supplier-details/"+idProduct])

  }
}