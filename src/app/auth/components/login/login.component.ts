import { Component, effect, inject, OnDestroy, OnInit, signal } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MessageService } from "src/app/messages/services/message.service";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { User } from "../../models/users.model";
import { Router } from "@angular/router";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {

  fb = inject(FormBuilder);
  messageService = inject(MessageService);
  authService = inject(AuthService);

  usersList = signal<User[]>([]);

  ngOnInit() {
      this.getAllUsers();
  }

  getAllUsers() {
    this.authService.getAllUsers().subscribe((res) => this.usersList.set(res));
  }

  fg = this.fb.group({
    username: this.fb.control("", [Validators.required]),
    password: this.fb.control("", [Validators.required]),
  });

  getSelectedUser(username: string) {
    if (!username) {
      this.fg.get("password")?.setValue("");
      return;
    }
    const user = this.usersList().find(
      (user: User) => user.username === username
    );

    if (user) {
      this.authService.getUserData(user);
      this.fg.get("password")?.setValue(user.password);
    }
  }

  onSubmit() {
    if (this.fg.valid) {
      const { username, password } = this.fg.value;
      this.authService.login(username, password);
      

    }
  }

}
