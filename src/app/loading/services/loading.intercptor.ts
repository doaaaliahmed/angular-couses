import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { LoadingService } from "./loading.service";
import { inject } from "@angular/core";
import { finalize } from "rxjs/operators";

export const LoadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const loading = inject(LoadingService);

  loading.loadingOn();

  return next(req).pipe(finalize(() => loading.loadingOff()));
};
