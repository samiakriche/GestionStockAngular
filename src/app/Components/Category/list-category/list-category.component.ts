import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/Shared/services/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {


  items = [];
  myForm: FormGroup;

  constructor(private categoryService: CategoryService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.fetchData();
    this.createForm();
  }

  fetchData() {
    this.categoryService.getItems().subscribe(
      res => {
        this.items = res;
      },
      err => {
        console.log(err);
      }
    );
  }


  createForm() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }


  add() {
    this.categoryService.addItem(this.myForm.value).subscribe(
      res => {
        this.myForm.reset();
         this.fetchData();
      },
      err => {
        console.log(err);
      }
    );
  }


  delete(id) {
    this.categoryService.deleteItem(id).subscribe(
      res => {
        console.log(res);
        this.fetchData();
      },
      err => {
        console.log('errror : ' + err);
      }
    );
  }


}
