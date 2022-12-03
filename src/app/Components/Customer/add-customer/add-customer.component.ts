import { CustomerService } from './../../../Shared/services/customer.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  myForm: FormGroup;
  isTrue=true;
  ErrorMessage: string="kjkjkj";
  isSbmitted = false;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      city: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  submit() {
    this.customerService.addItem(this.myForm.value).subscribe(
      (res) => {
        // this.myForm.reset(this.myForm.value);
        this.isTrue=true;
        this.ConfirmationMessage();
        this.myForm.reset();
        this.ErrorMessage = 'Client ajouté avec succès';
      },
      (err) => {
        this.isTrue=false;
        this.ConfirmationMessage();
        this.ErrorMessage = 'problème dans l\'ajout';
        console.log('error  : ' + err);
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
