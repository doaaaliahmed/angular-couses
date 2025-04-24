import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ISingleProduct } from "../model/single-product.model";

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ISingleProduct[]> {
    return this.http.get<ISingleProduct[]>(`${environment.API}/products`);
  }

  

  createProduct(product: Partial<ISingleProduct>): Observable<ISingleProduct> {
    return this.http.post<ISingleProduct>(
      `${environment.API}/products`,
      product
    );
  }

  updateProduct(product: Partial<ISingleProduct>): Observable<ISingleProduct> {
    return this.http.put<ISingleProduct>(
      `${environment.API}/products/${product.id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.API}/products/${id}`);
  }
}
