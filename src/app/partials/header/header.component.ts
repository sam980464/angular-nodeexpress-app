import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/authentication.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    title: any
    userInfo: any;
    constructor(public authService: AuthService) {

    }
    ngOnInit() {

        this.userInfo = this.authService.getUserInfo();
    }

    logout() {
        this.authService.logout();
        window.location.reload();
    }
}
