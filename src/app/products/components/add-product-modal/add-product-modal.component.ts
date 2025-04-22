import {
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
  ViewChild,
} from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductsService } from "../../services/products.service";
import { ICreateProduct } from "../../model/single-product.model";

@Component({
  selector: "add-product-modal",
  templateUrl: "./add-product-modal.component.html",
  styleUrl: "./add-product-modal.component.css",
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AddProductModalComponent {
 
  @Output() closeProductmodal = new EventEmitter<boolean>(false);
  @Output() createdProductData = new EventEmitter<Partial<ICreateProduct>>();

  //  INJECTORS
  private fb = inject(FormBuilder)
  
  fg = this.fb.group({
    title: [{ value: null, disabled: false }, [Validators.required]],
    price: [{ value: null, disabled: false }, [Validators.required]],
    description: [{ value: null, disabled: false }, [Validators.required]],
    category: [{ value: null, disabled: false }, [Validators.required]],
    image: [{ value: null, disabled: false }, [Validators.required]],
  });

  imagePreview = signal<string | ArrayBuffer | null>(null);

  constructor() {}

  onClose() {
    this.closeProductmodal.emit(true);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fg.get("image")?.setValue(reader.result as string); // base64 data URL
        this.imagePreview.set(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  save() {
    if (this.fg.invalid) return;
    this.createdProductData.emit(this.fg.value);
  }
}
