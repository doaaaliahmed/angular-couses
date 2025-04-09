import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductModalComponent } from './components/add-product-modal/add-product-modal.component';
import { FilterProductsComponent } from './components/filter-products/filter-products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsService } from './services/products.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddProductModalComponent,
    FilterProductsComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers :[
    ProductsService
  ],
  exports: [
    AddProductModalComponent,
    FilterProductsComponent,
    ProductCardComponent
  ]
})
export class ProductsModule { }
