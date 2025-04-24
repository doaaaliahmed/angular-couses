import { Component, inject } from "@angular/core";
import { MessageService } from "./services/message.service";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

@Component({
  selector: "messages",
  imports: [MatIconModule , CommonModule],
  templateUrl: "./messages.component.html",
  styleUrl: "./messages.component.css",
})
export class MessagesComponent {
  messageService = inject(MessageService);

  messages = this.messageService.message;

  onClose() {
    this.messageService.clearMessage();
  }
}
