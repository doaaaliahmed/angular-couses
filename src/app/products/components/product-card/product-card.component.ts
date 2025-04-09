import { Component, Input } from "@angular/core";
import { ISingleProduct } from "../../model/single-product.model";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrl: "./product-card.component.css",
  standalone:false
})
export class ProductCardComponent {
  @Input() product: ISingleProduct;


}
