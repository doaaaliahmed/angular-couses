import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: "add-product-modal",
  templateUrl: "./add-product-modal.component.html",
  styleUrl: "./add-product-modal.component.css",
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AddProductModalComponent {
  @Output() closeProductmodal = new EventEmitter<boolean>(false);



  fg = this.fb.group({
    title: [{ value: null, disabled: false }, [Validators.required]],
    price: [{ value: null, disabled: false }, [Validators.required]],
    description: [{ value: null, disabled: false }, [Validators.required]],
    category: [{ value: null, disabled: false }, [Validators.required]],
    image: [{ value: null, disabled: false }, [Validators.required]],
  });

  constructor(private fb : FormBuilder , private ProductSVC : ProductsService) {}

  onClose() {
    this.closeProductmodal.emit(true);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fg.get("image")?.setValue(reader.result as string); // base64 data URL
      };
      reader.readAsDataURL(file);
    }
  }


  save(){
    if(this.fg.invalid) return;
    
    this.ProductSVC.createProduct(this.fg.value).subscribe(res=> console.log(res))

  }
}
