import { enableProdMode, importProvidersFrom } from "@angular/core";

import { environment } from "./environments/environment";
import { bootstrapApplication, BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideAnimations } from "@angular/platform-browser/animations";
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { LoadingInterceptor } from "./app/loading/services/loading.intercptor";
import { AuthInterceptor } from "./app/auth/services/auth.interceptor";

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

//convert BootstapModule to Application

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([LoadingInterceptor , AuthInterceptor])),
    provideAnimationsAsync(),
  ],
}).catch((err) => console.log(err));
