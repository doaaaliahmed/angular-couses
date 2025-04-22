import { Component, Input } from "@angular/core";

@Component({
  selector: "sucess-alert-message",
  imports: [],
  templateUrl: "./sucess-alert-message.component.html",
  styleUrl: "./sucess-alert-message.component.css",
})
export class SucessAlertMessageComponent {
  @Input() message!: string;
}
