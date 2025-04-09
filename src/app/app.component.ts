import {
  Component,
  OnInit,

} from "@angular/core";
import { ProductsService } from "./products/services/products.service";
import { ISingleProduct } from "./products/model/single-product.model";
import { AddProductModalComponent } from "./products/components/add-product-modal/add-product-modal.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: false
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

  addNewProduct(isAdd: boolean) {
    this.openProductDialog = isAdd;
  }

  onClose(isClose: boolean) {
    this.openProductDialog = !isClose;
  }
}
