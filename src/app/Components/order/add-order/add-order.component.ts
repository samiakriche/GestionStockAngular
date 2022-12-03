import { ProductService } from './../../../Shared/services/product.service';
import { CustomerService } from './../../../Shared/services/customer.service';
import { Ligne, OrderService } from './../../../Shared/services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CartOrder } from 'src/app/Shared/services/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  opValide = false;

  client = [];
  cartOrder$: CartOrder;
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private customerService: CustomerService,
    private productService: ProductService
  ) {}
  // constructor(){}

  ngOnInit(): void {
    this.opValide = false;
    this.createForm();
    this.orderService.carts$.subscribe((res) => (this.cartOrder$ = res));
    this.getClient();
  }

  createForm(): any {
    this.myForm = this.fb.group({
      idClient: ['', [Validators.required]],
    });
  }

  valide(): any {
    this.orderService.passOrder(this.myForm.get('idClient').value).subscribe(
      (res) => {
        this.opValide = true;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  AjouterLign() {
    this.orderService.addLigne();
  }

  getClient() {
    this.customerService.getItems().subscribe(
      (res) => {
        this.client = res;
        console.log(res);
      },
      (err) => console.log(err)
    );
  }


  
  // Scan
  fermer() {
    this.orderService.carts$.next({
      idClient: 0,
      lignes: [new Ligne('first')],
    });
    this.opValide = false;
  }

  imprimer(send) {
    this.orderService.scanPdf(send);
    this.opValide=false;
  }
}
