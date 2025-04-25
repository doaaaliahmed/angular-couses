import {
  Component,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout/layout/layout.component";
import { MessagesComponent } from "./messages/messages.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports :[RouterModule,LayoutComponent, MessagesComponent]
})
export class AppComponent  {

}
