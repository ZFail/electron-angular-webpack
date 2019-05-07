import { Injectable } from '@angular/core';
import {IdGenerator} from './id-generator';

@Injectable({
  providedIn: 'root'
})
export class IdServiceService {

  constructor() {
    console.warn('IdServiceService');
  }

  ngOnInit() {
    console.warn('IdServiceService ngOnInit');
  }

  ngOnDestroy() {
    console.warn('IdServiceService ngOnDestroy');
  }

  generateId() {
    return IdGenerator.generateId();
  }
}
