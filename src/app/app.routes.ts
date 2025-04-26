import { Routes } from "@angular/router";
import { isUserAuthorized } from "./auth/services/auth.guard";

export const routes: Routes = [
  { path: "", redirectTo: "products", pathMatch: "full" },
  {
    path: "products",
    loadComponent: () =>
      import("./products/pages/all-products/all-products.component").then(
        (m) => m.AllProductsComponent
      ),
    canActivate: [isUserAuthorized],
  },
  {
    path: "login",
    loadComponent: () =>
      import("./auth/components/login/login.component").then(
        (m) => m.LoginComponent
      ),
  },
];
