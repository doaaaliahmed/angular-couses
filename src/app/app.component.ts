import { Component, OnInit } from "@angular/core";
import { ProductsService } from "./products/services/products.service";
import { CommonModule } from "@angular/common";
import { ProductCardComponent } from "./products/components/product-card/product-card.component";
import { ISingleProduct } from "./products/model/single-product.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  imports: [CommonModule , ProductCardComponent ],
  providers:[ProductsService]
})
export class AppComponent implements OnInit {
producList : ISingleProduct[] = []
  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((res)=> this.producList = res);

  }
}
