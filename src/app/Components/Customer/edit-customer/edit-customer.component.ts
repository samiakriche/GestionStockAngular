import { CustomerService } from './../../../Shared/services/customer.service';
import { Customer } from './../../../Shared/Models/Customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  myForm: FormGroup;
  id: string;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private customerService: CustomerService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.createForm();
    this.id = this.route.snapshot.params.id;
    this.fetchData();
  }

  createForm(){
    this.myForm = this.fb.group({
      firstname: ['',[Validators.required]],
      lastname : ['',[Validators.required]],
      city : ['', [Validators.required]],
      email : ['', [Validators.email,Validators.required]],
      phone : ['', [Validators.required]],
      address : ['', [Validators.required]]
  });
  }

  fetchData(){
    this.customerService.getById(this.id).subscribe(
      (res) => {
        this.remplissage(res);
      },
      err => {
        console.log('error    : => '+err);
      }
    );
  }


  remplissage(cust: Customer){
    this.myForm.get('firstname').setValue(cust.firstname);
    this.myForm.get('lastname').setValue(cust.lastname);
    this.myForm.get('city').setValue(cust.city);
    this.myForm.get('email').setValue(cust.email);
    this.myForm.get('phone').setValue(cust.phone);
    this.myForm.get('address').setValue(cust.address);
  }



  submit(){
    this.customerService.updateItem(this.myForm.value,this.id).subscribe(
      res => {
        this.router.navigateByUrl('home/customer');
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }


}
