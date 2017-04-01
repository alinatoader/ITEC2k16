import {Component, OnInit}      from '@angular/core';

@Component({
    moduleId: "landing-id", 
    selector: 'app-landing',
    templateUrl: 'app/landing/landing.component.html'
})
export class LandingComponent implements OnInit {

    status = 'Loading landing page';
 
    constructor() {
        this.status = "Landing page loaded";
    }

    ngOnInit() {
        console.log("Landing on init callback");
    }
}
