import { Component } from "@angular/core";
import {IdServiceService} from './id-service/id-service.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Angular 7 HMR23";
  id: number = this.idServiceService.generateId()

  constructor(private idServiceService: IdServiceService) {
    console.warn('AppComponent', this.id);
  }

  ngOnInit() {
    console.warn('AppComponent ngOnInit', this.id);
  }

  ngOnDestroy() {
    console.warn('AppComponent ngOnDestroy', this.id);
  }
}
