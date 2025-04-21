import { Routes } from '@angular/router';
import { AllProductsComponent } from './products/pages/all-products/all-products.component';


export const routes: Routes = [
   { path: 'products',
    loadComponent: () =>
      import('./products/pages/all-products/all-products.component').then((m) => m.AllProductsComponent)}
];