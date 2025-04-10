import {
  Component,
  OnInit,

} from "@angular/core";
import { ProductsService } from "./products/services/products.service";
import { ISingleProduct } from "./products/model/single-product.model";
import { AddProductModalComponent } from "./products/components/add-product-modal/add-product-modal.component";
import { FilterProductsComponent } from "./products/components/filter-products/filter-products.component";
import { ProductCardComponent } from "./products/components/product-card/product-card.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports :[FilterProductsComponent , AddProductModalComponent ,ProductCardComponent , CommonModule] 
})
export class AppComponent implements OnInit {
  addProduct?: AddProductModalComponent;

  productList: ISingleProduct[] = [];
  openProductDialog: boolean = false;
  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService
      .getAllProducts()
      .subscribe((res) => (this.productList = res));
  }

  filterProductsByTitle(Proudcts: ISingleProduct[]) {
    this.productList = Proudcts;
  }

  addNewProduct(isAdd: boolean) {
    this.openProductDialog = isAdd;
  }

  onClose(isClose: boolean) {
    this.openProductDialog = !isClose;
  }
}
