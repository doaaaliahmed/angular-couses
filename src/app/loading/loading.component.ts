import { Component, inject } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'loading',
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
  standalone: true
})
export class LoadingComponent {

  private readonly loadingService = inject(LoadingService);

  // This is the reactive signal you can use in the template
  readonly isLoading = this.loadingService.isLoading;


}
