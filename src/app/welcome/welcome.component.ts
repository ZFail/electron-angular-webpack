import { Component, OnInit } from "@angular/core";
import {Hero} from './hero';
import {pool} from './hero_pool';
import {IdServiceService} from '../id-service/id-service.service';
// import * as fs from 'fs'

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  name2 = 'asdasd'
  name3 = 'asdasd222'
  id: number = this.idServiceService.generateId()
  constructor(private idServiceService: IdServiceService) {
    console.warn('WelcomeComponent', this.id);
  }

  newHero() {
    pool.hero = new Hero
  }

  heroFromPool() {
    return pool.hero
  }

  ngOnInit() {
    console.warn('WelcomeComponent ngOnInit', this.id);
    // console.log(fs.readFileSync('c:\\dev\\projects\\tutorial-angular-cli-hmr\\src\\app\\app.component.ts'))
  }
  ngOnDestroy() {
    console.warn('WelcomeComponent ngOnDestroy', this.id);
  }
}
