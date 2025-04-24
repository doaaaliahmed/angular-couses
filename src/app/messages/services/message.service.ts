import { Injectable, signal } from "@angular/core";
import { Message } from "../models/message.model";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  private messages = signal<Message | null>(null);

  message = this.messages.asReadonly();

  showMessage(message: Message) {
    this.messages.set(message);
  }

  clearMessage() {
    this.messages.set(null);
  }
}
