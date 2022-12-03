import { Product } from './../../../Shared/Models/Products.model';
import { ProductService } from './../../../Shared/services/product.service';
import { OrderService } from './../../../Shared/services/order.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ligne',
  templateUrl: './ligne.component.html',
  styleUrls: ['./ligne.component.css'],
})
export class LigneComponent implements OnInit {
  @Input()
  id: String;
  myForm: FormGroup;
  products = [];
  product;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getProducts();
  }

  createForm(): any {
    this.myForm = this.fb.group({
      quantity: ['', [Validators.required]],
      prixht: ['', [Validators.required]],
      tva: [20, [Validators.required]],
      reduction: ['', [Validators.email, Validators.required]],
      totalHT: ['', [Validators.required]],
      totalTTC: ['', [Validators.required]],
      idClient: ['', [Validators.required]],
      idProduct: ['', [Validators.required]],
    });
  }

  getProduct() {
    let id = this.myForm.get('idProduct').value;
    this.orderService.getByIdProduct(id).subscribe(
      (res) => {
        this.product = res;
    console.log(this.product);

      },
      (err) => {
        console.log(err);
      }
    );

  }

  deleteLign() {
    // console.log(this.id);
    this.orderService.delete(this.id);
  }

  valide(): any {
    this.orderService.valideLigne(this.myForm.value, this.id);
  }

  change(): any {
    var tHt =
      this.myForm.get('quantity').value * this.myForm.get('prixht').value -
      this.myForm.get('reduction').value;
    this.myForm.get('totalHT').setValue(tHt);
    var tttc =
      this.myForm.get('totalHT').value * (this.myForm.get('tva').value / 100) +
      this.myForm.get('totalHT').value;
    this.myForm.get('totalTTC').setValue(tttc);
    this.valide();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (res) => {
        console.log(res);
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
