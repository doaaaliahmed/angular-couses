import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
 @Output() filterProductsEventByTitle = new EventEmitter();
  @Output() addProductEvent = new EventEmitter<boolean>(false);

  search: FormControl = new FormControl("");

  //INJECTORS 
  productService = inject(ProductsService)


  constructor() {}

  ngOnInit() {
    this.search.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((val) =>{ 
     
      this.filterProductsEventByTitle.emit(val)
     
    } );
  }

  addNewProduct() {
    this.addProductEvent.emit(true);
  }
}
