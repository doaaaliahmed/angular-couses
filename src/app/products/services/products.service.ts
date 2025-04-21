import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ICreateProduct, ISingleProduct } from "../model/single-product.model";

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ISingleProduct[]> {
    return this.http
      .get<ISingleProduct[]>(`${environment.API}/products`)
  }


  createProduct(product: Partial<ICreateProduct>): Observable<ICreateProduct> {
    return this.http.post<ICreateProduct>(`${environment.API}/products`, product)
  }
}