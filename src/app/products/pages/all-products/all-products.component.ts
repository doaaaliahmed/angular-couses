import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  computed,
  signal,
  afterNextRender,
} from '@angular/core';
import { AddProductModalComponent } from '../../components/add-product-modal/add-product-modal.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { SucessAlertMessageComponent } from '../../components/sucess-alert-message/sucess-alert-message.component';
import { ErrorAlertMessageComponent } from '../../components/error-alert-message/error-alert-message.component';
import { ProductsService } from '../../services/products.service';
import {
  ICreateProduct,
  ISingleProduct,
} from '../../model/single-product.model';

@Component({
  selector: 'all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    AddProductModalComponent,
    ProductCardComponent,
    SucessAlertMessageComponent,
    ErrorAlertMessageComponent,
  ],
  providers: [ProductsService],
})
export class AllProductsComponent {
  // ViewChilds
  @ViewChild('successRef') successRef!: SucessAlertMessageComponent;
  @ViewChild('errorRef') errorRef!: ErrorAlertMessageComponent;

  // Signals
  private allProducts = signal<ISingleProduct[]>([]);
  private searchTitle = signal<string>('');
  openProductDialog = false;

  showSuccess = signal(false);
  showError = signal(false);
  message = signal<string>('');

  // Computed
  readonly filteredProducts = computed(() => {
    const products = this.allProducts();
    const title = this.searchTitle().toLowerCase();

    return title
      ? products.filter((p) => p.title.toLowerCase().includes(title))
      : products;
  });

  constructor(private productService: ProductsService) {
    afterNextRender(() => {
      this.loadProducts();
    });
  }

  // Load all products
  loadProducts() {
    this.productService.getAllProducts().subscribe((products) => {
      this.allProducts.set(products);
    });
  }

  // Handle product title search
  filterProductsByTitle(title: string) {
    this.searchTitle.set(title);
  }

  // Toggle modal
  addNewProduct(isOpen: boolean) {
    this.openProductDialog = isOpen;
  }

  onClose(isClosed: boolean) {
    this.openProductDialog = !isClosed;
  }

  // Create a product
  createProduct(product: Partial<ICreateProduct>) {
    this.openProductDialog = false;

    this.productService.createProduct(product).subscribe({
      next: (createdProduct) => {
        this.allProducts.update((prev) => [...prev, createdProduct]);
        this.showToast('Product Created Successfully', true);
      },
      error: () => {
        this.showToast('Something went wrong. Please try again.', false);
      },
    });
  }

  // Show success or error message
  private showToast(msg: string, isSuccess: boolean) {
    this.message.set(msg);
    if (isSuccess) {
      this.showSuccess.set(true);
    } else {
      this.showError.set(true);
    }

    setTimeout(() => {
      this.showSuccess.set(false);
      this.showError.set(false);
    }, 2000);
  }
}
