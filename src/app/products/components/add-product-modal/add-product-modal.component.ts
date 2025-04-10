import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrl: './add-product-modal.component.css',
  standalone:true
})
export class AddProductModalComponent {
@Output() closeProductmodal = new EventEmitter<boolean>(false);

  onClose() {
    this.closeProductmodal.emit(true);
  }

}
