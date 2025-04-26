import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "./auth.service";

export const isUserAuthorized: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const isLoggedIn = authService.isLoggedIn();
  const router = inject(Router);

  if (isLoggedIn) {
    return true;
  } else {
   return router.parseUrl("/login");
   
  }
};
