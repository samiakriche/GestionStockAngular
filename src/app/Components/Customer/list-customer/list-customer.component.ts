import { Customer } from './../../../Shared/Models/Customer.model';
import { CustomerService } from './../../../Shared/services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css'],
})
export class ListCustomerComponent implements OnInit {
  items: Customer[];
  firstname;
  p = 1;
  isTrue: boolean;
  ErrorMessage: string;
  isSbmitted = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.fetchdata();
  }

  fetchdata() {
    this.customerService.getItems().subscribe(
      (res) => {
        this.items = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  Search() {
    if (this.firstname == '') {
      this.ngOnInit();
    } else {
      this.items = this.items.filter((res) => {
        return (
          res.firstname
            .toLocaleLowerCase()
            .match(this.firstname.toLocaleLowerCase()) ||
          res.lastname
            .toLocaleLowerCase()
            .match(this.firstname.toLocaleLowerCase()) ||
          res.email
            .toLocaleLowerCase()
            .match(this.firstname.toLocaleLowerCase())
        );
      });
    }
  }

  delete(id) {
    this.customerService.deleteItem(id).subscribe(
      (res) => {
        this.isTrue=true;
        this.fetchdata();
        this.ConfirmationMessage();
        this.ErrorMessage = 'supprimer avec succès';
      },
      (err) => {
        this.isTrue=false;
        this.ConfirmationMessage();
        this.ErrorMessage = 'impossible de supprimer ce client';
        console.log('error : ' + err);
      }
    );
  }

  ConfirmationMessage() {
    this.isSbmitted = true;
    setTimeout(() => {
      this.isSbmitted = false;
    }, 3000);
  }
}
