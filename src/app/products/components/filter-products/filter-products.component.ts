import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "filter-products",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./filter-products.component.html",
  styleUrl: "./filter-products.component.css",
})
export class FilterProductsComponent {
  @Output() filterProductsEvent = new EventEmitter<string>();
  @Output() resetFiltersEvent = new EventEmitter<boolean>(false);

  search: FormControl = new FormControl("");

  filterProducts() {
    if (this.search.value.length > 0)
      this.filterProductsEvent.emit(this.search.value);
  }

  resetFilters(){
    this.search.reset();
    this.resetFiltersEvent.emit(true);
    
  }
}
