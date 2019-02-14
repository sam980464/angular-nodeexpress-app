import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    title: any
    @Input() userInfo: string;
    constructor() {

    }
    ngOnInit() { }
}
