import { Component, input, Input, output } from "@angular/core";
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
  product = input.required<ISingleProduct>();
  deleteProductEvent = output<number>();
  editProductEvent = output<ISingleProduct>();


  delete() {
    this.deleteProductEvent.emit(this.product().id);
  }

  update() {
    this.editProductEvent.emit(this.product());
  }

  addToCart(id: number) {}
}
