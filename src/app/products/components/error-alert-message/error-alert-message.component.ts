import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-alert-message',
  imports: [],
  templateUrl: './error-alert-message.component.html',
  styleUrl: './error-alert-message.component.css'
})
export class ErrorAlertMessageComponent {
   @Input() message!: string;

}
