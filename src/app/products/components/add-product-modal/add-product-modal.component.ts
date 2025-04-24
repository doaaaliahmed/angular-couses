import {
  Component,
  EventEmitter,
  inject,
  input,
  OnChanges,
  output,
  Output,
  signal,
  ViewChild,
} from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductsService } from "../../services/products.service";
import { ISingleProduct } from "../../model/single-product.model";

@Component({
  selector: "add-product-modal",
  templateUrl: "./add-product-modal.component.html",
  styleUrl: "./add-product-modal.component.css",
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AddProductModalComponent implements OnChanges {
  //OutPut signals
  closeProductmodal = output<boolean>();
  createdProductData = output<Partial<ISingleProduct>>();
  updatedProductData = output<Partial<ISingleProduct>>();

  //Input signals
  productData = input<ISingleProduct>();

  //  INJECTORS
  private fb = inject(FormBuilder);

  fg = this.fb.group({
    id: [{ value: 0, disabled: false }],
    title: [{ value: null, disabled: false }, [Validators.required]],
    price: [{ value: null, disabled: false }, [Validators.required]],
    description: [{ value: null, disabled: false }, [Validators.required]],
    category: [{ value: null, disabled: false }, [Validators.required]],
    image: [{ value: null, disabled: false }, [Validators.required]],
  });

  imagePreview = signal<string | ArrayBuffer | null>(null);

  constructor() {}

  ngOnChanges() {
    if (this.productData()) {
      this.fg.patchValue({
        id: this.productData().id,
        title: this.productData().title,
        price: this.productData().price,
        description: this.productData().description,
        category: this.productData().category,
        image: this.productData().image,
      });

      this.imagePreview.set(this.productData().image);
    }
  }

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
    if (this.fg.value.id === 0) this.createdProductData.emit(this.fg.value);
    else this.updatedProductData.emit(this.fg.value);
  }
}
