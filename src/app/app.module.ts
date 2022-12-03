import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddSupplierComponent } from './Components/Supplier/add-Supplier/add-supplier/add-supplier.component';
import { ListSupplierComponent } from './Components/Supplier/list-Supplier/list-supplier/list-supplier.component';
import { EditSupplierComponent } from './Components/Supplier/edit-supplier/edit-supplier.component';
import { AddProductComponent } from './Components/Product/add-product/add-product.component';
import { ListProductComponent } from './Components/Product/list-product/list-product.component';
import { EditProductComponent } from './Components/Product/edit-product/edit-product.component';
import { ListEmployeeComponent } from './Components/Employee/list-employee/list-employee.component';
import { AddCustomerComponent } from './Components/Customer/add-customer/add-customer.component';
import { ListCustomerComponent } from './Components/Customer/list-customer/list-customer.component';
import { EditCustomerComponent } from './Components/Customer/edit-customer/edit-customer.component';
import { ListCategoryComponent } from './Components/Category/list-category/list-category.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { LoginComponent } from './Components/login/login.component';
import { ListOrderComponent } from './Components/order/list-order/list-order.component';
import { DetailOrderComponent } from './Components/order/detail-order/detail-order.component';
import { AddOrderComponent } from './Components/order/add-order/add-order.component';
import { LigneComponent } from './Components/order/ligne/ligne.component';
import { CustOrderComponent } from './Components/Customer/cust-order/cust-order.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SupplierDetailsComponent } from './Components/Supplier/supplier-details/supplier-details.component';
import { FilterPipe } from './Shared/pipes/filter.pipe';
import { EllipsisPipe } from './Shared/pipes/ellipsis.pipe';
import { ProdutDetailsComponent } from './Components/Product/produt-details/produt-details.component';
import { JwtInterceptorInterceptor } from './Shared/helpers/jwt-interceptor.interceptor';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AddSupplierComponent,
    ListSupplierComponent,
    EditSupplierComponent,
    AddProductComponent,
    ListProductComponent,
    EditProductComponent,
    ListEmployeeComponent,
    AddCustomerComponent,
    ListCustomerComponent,
    EditCustomerComponent,
    ListCategoryComponent,
    SidebarComponent,
    LoginComponent,
    ListOrderComponent,
    DetailOrderComponent,
    AddOrderComponent,
    LigneComponent,
    CustOrderComponent,
    SupplierDetailsComponent,
    FilterPipe,
    EllipsisPipe,
    ProdutDetailsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ChartsModule,
    BrowserAnimationsModule,
   // BrowserAnimationsModule
  ],
  providers: [       
     { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
