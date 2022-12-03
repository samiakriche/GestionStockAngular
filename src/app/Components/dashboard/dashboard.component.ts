import { Component, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { OrderService } from 'src/app/Shared/services/order.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private OorderService:OrderService){

  }
  sumVents;
  countClient;
  countFours;


  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true
          }
      }]
  }
  };
  public barChartLabels =['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendedi', 'Semedi', 'dimanche'];
  public lineChartLabels =[];;
  public barChartData : {data , label}[]= []
  public lineChartData=[];
  ngOnInit(): void {
          this.getTotalProdouctsOrdered()
          this.getTotalPriceByProducts();
          this.getSums();
      this.getFous();
      this.getClients();
  }
  getTotalPriceByProducts(){
     this.OorderService.TotalPriceByProducts().subscribe((resp:any)=>{
      this.barChartData = [{data: resp, label: 'Somme d \' achat chqaue jour'}]
    })
  }
  getTotalProdouctsOrdered(){
    this.OorderService.TotalProdouctsOrdered().subscribe( d=>{
      console.log(d)
      const product=[]
      const productNumber=[]
      for  (const item of d) {
        productNumber.push(item.nombreProduct)
        product.push(item.name)
        if(productNumber.length===10){
          break;
        }
      }
      this.lineChartLabels = product;
      this.lineChartData = [{data: productNumber, label: 'Produits le Plus Achat'}]
    })
  }

  getSums(){
    this.OorderService.getTotalVentsByMonth().subscribe(
      res => this.sumVents = res,
      err => console.log(err)
    )
  }

  getClients(){
    this.OorderService.getTotalCustomer().subscribe(
      res => this.countClient = res,
      err => console.log(err)
    )
  }

  getFous(){
    this.OorderService.getTotalSupplier().subscribe(
      res => this.countFours = res,
      err => console.log(err)
    )
  }


  }
  
   


