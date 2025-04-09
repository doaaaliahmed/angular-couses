import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: "filter-products",
  templateUrl: "./filter-products.component.html",
  styleUrl: "./filter-products.component.css",
  standalone : false
})
export class FilterProductsComponent {
  @Output() filterProductsEvent = new EventEmitter<string>();
  @Output() resetFiltersEvent = new EventEmitter<boolean>(false);
  @Output() addProductEvent = new EventEmitter<boolean>(false);

  search: FormControl = this.fb.control("");

  constructor(private fb : FormBuilder){}

  filterProducts() {
    if (this.search.value.length > 0)
      this.filterProductsEvent.emit(this.search.value);
    else this.resetFiltersEvent.emit(true);
  }

  addNewProduct() {
    this.addProductEvent.emit(true);
  }
}
