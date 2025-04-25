import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/users.model";
import { MessageService } from "src/app/messages/services/message.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
 
  //Signals
  userToken = signal<string>("");
  user = signal<User | null>(null);

  userData = this.user.asReadonly();
  isLoggedIn = computed(() => !!this.userToken());

  //Injectables Service
  http = inject(HttpClient);
  messageService = inject(MessageService);

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API}/users`);
  }

  login(username: string, password: string) {
    this.http
      .post(`${environment.API}/auth/login`, {
        username,
        password,
      }).pipe( 
      )
      .subscribe({
        next: (res) => {
          this.userToken.set(res["token"]);
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
    });
  }

  getUserData(user){
    this.user.set(user);
  }

  logout() {
    this.userToken.set("");
    this.user.set(null);
  }
}
