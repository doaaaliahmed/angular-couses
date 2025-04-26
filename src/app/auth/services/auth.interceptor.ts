import {
  HttpContextToken,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize } from "rxjs/operators";
import { AuthService } from "./auth.service";

export const skipAuthInterceptor = new HttpContextToken(() => false);

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const auth = inject(AuthService);

  const token = auth.userToken();

  if(req.context.get(skipAuthInterceptor)) {
    return next(req);
  }

    const authReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`),
    });

    return next(authReq);

};
