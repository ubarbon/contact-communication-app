import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.router.navigate([{outlets: {dashboard: ['contacts']}}], {relativeTo: this.route});
    }
}
