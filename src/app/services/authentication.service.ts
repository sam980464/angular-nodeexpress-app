import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    logIn(value: any) {
        localStorage.setItem("loggedIn", JSON.stringify(value));
    }

    logout() {
        localStorage.removeItem('loggedIn');
    }
    getUserInfo() {
        return (localStorage.getItem('loggedIn')) ? JSON.parse(localStorage.getItem('loggedIn')) : null;
    }
}