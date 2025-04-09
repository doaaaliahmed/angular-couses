import { Component, OnInit } from "@angular/core";
import { ProductsService } from "./products/services/products.service";
import { CommonModule } from "@angular/common";
import { ProductCardComponent } from "./products/components/product-card/product-card.component";
import { ISingleProduct } from "./products/model/single-product.model";
import { FilterProductsComponent } from "./products/components/filter-products/filter-products.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  imports: [CommonModule, FilterProductsComponent, ProductCardComponent],
  providers: [ProductsService],
})
export class AppComponent implements OnInit {
  productList: ISingleProduct[] = [];
  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService
      .getAllProducts()
      .subscribe((res) => (this.productList = res));
  }

  filterProductsByTitle(value: string) {
    this.productList = this.productList.filter((product) =>
      product.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
  }

  resetFilters(isReset: boolean) {
    if (isReset) {
      this.getAllProducts();
    }
  }
}
