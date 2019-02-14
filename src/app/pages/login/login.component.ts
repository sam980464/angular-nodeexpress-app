import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpRequestServices } from '../../services/httprequest.services';
@Component({
    selector: 'app-login',
    templateUrl: 'login.html'
})

export class LoginComponent implements OnInit {
    loginModel: FormGroup;
    constructor(public loginFB: FormBuilder,
        public router: Router,
        public httpService: HttpRequestServices,
    ) {
        this.loginModel = loginFB.group({
            uname: [null, Validators.compose([Validators.required])],
            password: [null, Validators.required]
        })
    }
    ngOnInit() {

    }

    dologin(value: any) {
        this.httpService.login(value).subscribe(loginResponse => {
            if (loginResponse) {
                if (JSON.parse(loginResponse['_body']).length == 0) {
                    alert("Incorrect Credentials");
                } else {
                    alert("Login Success");
                    this.router.navigate(["/"]);

                }

            } else {

            }
        }, err => {

        })
    }
}