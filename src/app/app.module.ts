import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsModule } from './products/products.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ProductsModule ,// ✅ This brings in all your modular components
    HttpClientModule,   // ✅ Required for ProductsService to work
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
