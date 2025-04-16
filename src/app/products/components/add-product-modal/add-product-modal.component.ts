import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrl: './add-product-modal.component.css',
  standalone:true,
  providers:[]
})
export class AddProductModalComponent {

@Output() closeProductmodal = new EventEmitter<boolean>(false);
imageUrl: string | ArrayBuffer | null = null;

constructor(){}

  onClose() {
    this.closeProductmodal.emit(true);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result; // base64 data URL

      };
      reader.readAsDataURL(file);
    }
  }

}
