import { Order } from './../Models/Order.model';
import { PdfMakerService } from './pdf-maker.service';
import { CustomerService } from './customer.service';
import { Customer } from './../Models/Customer.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = ' http://localhost:8098';
  private cartOrder: CartOrder = {
    idClient: 0,
    lignes: [new Ligne('first')],
  };

  carts$ = new BehaviorSubject<CartOrder>(this.cartOrder);

  constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    private pdfMakerService: PdfMakerService
  ) {}

  delete(id): any {
    if (this.cartOrder.lignes.length > 1) {
      this.cartOrder.lignes = this.cartOrder.lignes.filter((o) => o.id != id);
    }
    this.carts$.next(this.cartOrder);
  }

  getAllOrder(): Observable<any> {
    return this.http.get<any>(this.url + '/order');
  }

  addLigne(): any {
    let prod = new Ligne(this.uuidv4());
    this.cartOrder.lignes.push(prod);
    this.carts$.next(this.cartOrder);
  }

  passOrder(idClient): Observable<any> {
    this.cartOrder.idClient = idClient;
    console.log(this.cartOrder);
    return this.http
      .post(this.url + '/order/add', this.cartOrder)
      .pipe(map((res) => {}));
  }

  getDetailsOrder(id): Observable<Order> {
    return this.http.get<Order>(this.url + '/order/' + id);
  }

  valideLigne(item, id): any {
    let i = this.cartOrder.lignes.findIndex((p) => p.id === id);

    this.cartOrder.lignes[i].quantity = item.quantity;
    this.cartOrder.lignes[i].prixht = item.prixht;
    this.cartOrder.lignes[i].tva = item.tva;
    this.cartOrder.lignes[i].reduction = item.reduction;
    this.cartOrder.lignes[i].idProduct = item.idProduct;
    this.cartOrder.lignes[i].totalHT = item.totalHT;
    this.cartOrder.lignes[i].totalTTC = item.totalTTC;
  }

  deleteOrderById(id): Observable<any> {
    return this.http.delete(this.url + '/order/' + id);
  }

  // Scan Function
  scanPdf(send) {
    console.log('from ordeer  : ');
    console.log(this.cartOrder.idClient);

    let customer: Customer;
    this.customerService.getById(this.cartOrder.idClient).subscribe((res) => {
      console.log(res);
      customer = res;
      this.pdfMakerService.generatePDF(this.cartOrder, customer,send);
    });
  }


  getByIdProduct(id){
    return this.http.get(this.url+"/product/"+id);
  }


  
  getTotalVentsByMonth(){
    return this.http.get(this.url+"/order/totalforthismonth");
  }

  getTotalCustomer(){
    return this.http.get(this.url+"/customer/totalofcustomers");
  }

  getTotalSupplier(){
    return this.http.get(this.url+"/supplier/totalofsupplier");
  }


  // random Id
  uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  TotalPriceByProducts(): Observable<any> {
    return this.http.get<any>(this.url + '/order/TotalPriceByProducts').pipe(map(res=>{
       let revenuePerDay:number[]=[]
       revenuePerDay = revenuePerDay.fill(0,0,7)
     for(let index = 0; index <res.length; index++){
      let d = (new Date(res[index]?.dateoperation)).getDay()
        revenuePerDay[d-1]=res[index]?.nombreProduct
     }
     let swap = revenuePerDay[0]
     revenuePerDay[6] =revenuePerDay[0]
     revenuePerDay[0]= swap
    return revenuePerDay;
    }));
  }
  TotalProdouctsOrdered(): Observable<any> {
    return this.http.get<any>(this.url + '/order/TotalProdouctsOrdered' );
  }

}

export class Ligne {
  public id: string;
  public quantity = 0;
  public prixht = 0;
  public tva = 0;
  public reduction = 0;
  public idProduct = 0;
  public totalHT = 0;
  public totalTTC = 0;

  constructor(id: string) {
    this.id = id;
  }
}

export class CartOrder {
  idClient: number;
  lignes: Ligne[];
}
