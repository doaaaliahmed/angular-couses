import { CommonModule } from "@angular/common";
import {
  Component,
  ViewChild,
  computed,
  signal,
  afterNextRender,
  inject,
} from "@angular/core";
import { AddProductModalComponent } from "../../components/add-product-modal/add-product-modal.component";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { ProductsService } from "../../services/products.service";
import { ISingleProduct } from "../../model/single-product.model";
import { LoadingComponent } from "src/app/loading/loading.component";
import { MessageService } from "src/app/messages/services/message.service";

@Component({
  selector: "all-products",
  templateUrl: "./all-products.component.html",
  styleUrl: "./all-products.component.css",
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    AddProductModalComponent,
    ProductCardComponent,
    LoadingComponent
  ],
  providers: [ProductsService],
})
export class AllProductsComponent {
  // Signals
  private allProducts = signal<ISingleProduct[] | null>(null);
  private searchTitle = signal<string>("");
  openProductDialog = false;
  productToUpdate = signal<ISingleProduct | null>(null);

  // Computed
  readonly filteredProducts = computed(() => {
    const products = this.allProducts();
    const title = this.searchTitle().toLowerCase();

    return title
      ? products?.filter((p) => p.title.toLowerCase().includes(title))
      : products;
  });

  readonly noDataFound = computed(() => {
    const filterdProducts = this.filteredProducts();

    return filterdProducts && filterdProducts.length === 0 ? true : false;
  });

  // INJECTORS
  productsService = inject(ProductsService);
  messageService = inject(MessageService);

  constructor() {
    afterNextRender(() => {
      this.loadProducts();
    });
  }

  // Load all products
  loadProducts() {
    this.productsService.getAllProducts().subscribe((products) => {
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
  createProduct(product: Partial<ISingleProduct>) {
    this.openProductDialog = false;

    this.productsService.createProduct(product).subscribe({
      next: (createdProduct) => {
        this.allProducts.update((prev) => [...prev, createdProduct]);
        this.messageService.showMessage({
          text : "Product Created Successfully",
          savirty : 'success'
        });
      },
      error: () => {
        this.messageService.showMessage({
          text : "Something went wrong. Please try again.",
          savirty : 'error'
        });
       
      },
    });
  }

  // Create a product

  delete(id: number) {
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        this.allProducts.update((prev) => prev.filter((p) => p.id !== id));
        this.messageService.showMessage({
          text : "Product Deleted Successfully",
          savirty : 'success'
        });
      
      },
      error: () => {
        this.messageService.showMessage({
          text : "Something went wrong. Please try again.",
          savirty : 'error'
        });
      },
    });
  }

  // Update a product
  openDialogToEdit(product: ISingleProduct) {
    this.openProductDialog = true;
    this.productToUpdate.set(product);
  }

  // Create a product
  updateProduct(product: Partial<ISingleProduct>) {
    this.openProductDialog = false;

    this.productsService.updateProduct(product).subscribe({
      next: (createdProduct) => {
        this.allProducts.update((prev) =>
          prev.map((p) => (p.id === createdProduct.id ? createdProduct : p))
        );
        this.messageService.showMessage({
          text : "Product Updated Successfully",
          savirty : 'success'
        });
        
      },
      error: () => {
        this.messageService.showMessage({
          text : "Something went wrong. Please try again.",
          savirty : 'error'
        });
      },
    });
  }
}
