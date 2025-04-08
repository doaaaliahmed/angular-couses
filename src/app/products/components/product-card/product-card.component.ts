import { Component, Input } from '@angular/core';
import { ISingleProduct } from '../../model/single-product.model';

@Component({
  selector: 'product-card',
  imports: [],
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product : ISingleProduct

}
