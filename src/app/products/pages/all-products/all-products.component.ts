import { CommonModule } from "@angular/common";
import {
  afterNextRender,
  Component,
  computed,
  effect,
  signal,
} from "@angular/core";
import { AddProductModalComponent } from "../../components/add-product-modal/add-product-modal.component";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { ISingleProduct } from "../../model/single-product.model";
import { ProductsService } from "../../services/products.service";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

@Component({
  selector: "all-products",
  templateUrl: "./all-products.component.html",
  styleUrl: "./all-products.component.css",
  imports: [
    SearchBarComponent,
    AddProductModalComponent,
    ProductCardComponent,
    CommonModule,
  ],
  providers: [ProductsService],
})
export class AllProductsComponent {

  // Signals 
  productList = signal<ISingleProduct[]>([]);
  productTitle = signal<string>("");

  
  openProductDialog: boolean = false;

  // Computed 
  filteredProduct = computed(() => {
    const allProducts = this.productList();
    const title = this.productTitle();

    if (title.length > 0) {
      return allProducts.filter((product) =>
        product.title.toLowerCase().includes(title.toLowerCase())
      );
    }
    return allProducts;
  });



  constructor(private productService: ProductsService) {

    // USE AfterNextREnder Instead of ngOnInit 
    afterNextRender(() => {
      this.getAllProducts();
    });
  }


  // API To GEt All Products
  getAllProducts() {
    this.productService.getAllProducts().subscribe((res) => {
      this.productList.set(res);
    });
  }


  // FILTER BY TITLE
  filterProductsByTitle(title: string) {
    this.productTitle.set(title);
  }

  

  addNewProduct(isAdd: boolean) {
    this.openProductDialog = isAdd;
  }

  onClose(isClose: boolean) {
    this.openProductDialog = !isClose;
  }
}
