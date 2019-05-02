import { Component } from '@angular/core';

@Component({
    selector: 'demo-app',
    templateUrl: require('./app.component.html'),
    styleUrls: [require('./app.component.scss')]
})
export class AppComponent {
    title: string = 'def title23'

    constructor() {
        console.warn('AppComponent')
    }

    ngOnInit() {
        console.warn('AppComponent ngOnInit')
    }
    ngOnDestroy() {
        console.warn('AppComponent ngOnDestroy')
    }
}
