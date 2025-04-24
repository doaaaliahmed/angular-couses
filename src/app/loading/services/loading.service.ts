import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private readonly _loading = signal<boolean>(false);

  readonly isLoading = this._loading.asReadonly();

  loadingOn(): void {
    this._loading.set(true);
  }

  loadingOff(): void {
    this._loading.set(false);
  }
}