import { Component, Input } from "@angular/core";
import { ISingleProduct } from "../../model/single-product.model";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrl: "./product-card.component.css",
  standalone: true,
  imports: [MatIconModule],
})
export class ProductCardComponent {
  @Input() product: ISingleProduct;

  delete(id: number) {}

  update(id: number) {}

  addToCart(id: number) {}
}
