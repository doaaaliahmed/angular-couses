import { HttpClient, HttpContext } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/users.model";
import { MessageService } from "src/app/messages/services/message.service";
import { skipAuthInterceptor } from "./auth.interceptor";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  //Signals
  userToken = signal<string>("");
  user = signal<User | null>(null);

  headerContext = new HttpContext().set(skipAuthInterceptor, true);

  userData = this.user.asReadonly();
  isLoggedIn = computed(() => !!this.userToken());

  //Injectables Service
  http = inject(HttpClient);
  messageService = inject(MessageService);
  router = inject(Router);

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API}/users`, {
      context: this.headerContext
    });
  }

  login(username: string, password: string) {
    this.http
      .post(
        `${environment.API}/auth/login`,
        {
          username,
          password,
        },
        {
          context: this.headerContext
        }
      )
      .pipe()
      .subscribe({
        next: (res) => {
          this.router.navigate(['/products']);
          this.userToken.set(res["token"]);
          localStorage.setItem("token", res["token"]);
          this.messageService.showMessage({
            text: "Login Successful",
            savirty: "success",
          });
        },
        error: (err) => {
          this.messageService.showMessage({
            text: "Login Failed",
            savirty: "error",
          });
        },
      });
  }

  addNewUser(
    username: string,
    email: string,
    password: string
  ): Observable<unknown> {
    return this.http.post(`${environment.API}/users`, {
      email,
      username,
      password,
    },{
      context: this.headerContext
    });
  }

  getUserData(user) {
    this.user.set(user);
  }

  logout() {
    localStorage.removeItem("token");
    this.userToken.set("");
    this.user.set(null);
  }
}
