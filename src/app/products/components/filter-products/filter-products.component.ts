import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductsService } from "../../services/products.service";
import { ISingleProduct } from "../../model/single-product.model";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "filter-products",
  templateUrl: "./filter-products.component.html",
  styleUrl: "./filter-products.component.css",
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class FilterProductsComponent {
  @Output() filterProductsEvent = new EventEmitter<ISingleProduct[]>();
  @Output() addProductEvent = new EventEmitter<boolean>(false);

  search: FormControl = new FormControl("");

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.search.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((val) =>{
       this.filterProducts(val)
      });
  }

  filterProducts(val: string) {
    this.productService.getAllProducts().subscribe((res) => {
      const filterdProducts = res.filter((product) =>
        product.title.toLocaleLowerCase().includes(val.toLocaleLowerCase())
      );
      this.filterProductsEvent.emit(filterdProducts);
    });
  }

  addNewProduct() {
    this.addProductEvent.emit(true);
  }
}
