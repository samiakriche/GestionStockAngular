import { OrderService } from './../../../Shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  data = [];
  id;
  firstname;
  p: number = 1;
  constructor(private route: ActivatedRoute,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.fetchOrder();
  }

  Search(){
    if(this.firstname==""){
      this.ngOnInit();
    }else{
        this.data = this.data.filter(
          res => {
            return res.customer.firstname.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase()) 
                   || res.customer.lastname.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase())
                  //  || res.email.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase());
          }
        )
    }
  }



  fetchOrder(){
    this.orderService.getAllOrder().subscribe(
      res => {
        this.data = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }


  delete(id){
    this.orderService.deleteOrderById(id).subscribe(
      res => {
       this.fetchOrder();
      },
      err => {
        console.log(err);
      }
    )
  }

}
