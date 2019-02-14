import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpRequestServices } from '../../services/httprequest.services';
@Component({
    selector: 'app-register',
    templateUrl: 'register.html'
})

export class RegisterComponent implements OnInit {
    signupModel: FormGroup;

    constructor(public signupFB: FormBuilder,
        public router: Router,
        public httpService: HttpRequestServices,
    ) {
        this.signupModel = signupFB.group({
            email: [null, Validators.compose([Validators.required, Validators.email])],
            mobile: [null, Validators.compose([Validators.required])],
            uname: [null, Validators.compose([Validators.required])],
            password: [null, Validators.required],
            confirmPass: [null, Validators.required]
        }, { validator: this.checkPasswords })
    }
    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        let pass = group.controls.password.value;
        let confirmPass = group.controls.confirmPass.value;

        return pass === confirmPass ? null : { notSame: true }
    }
    ngOnInit() {

    }
    dosignup(value: any) {
        this.httpService.signup(value).subscribe(signupResponse => {
            if (signupResponse) {
                if (JSON.parse(signupResponse['_body']).length == 0) {
                    alert("Incorrect Data");
                } else {
                    alert("Registration Success");
                    this.router.navigate(["/login"]);
                }

            } else {

            }
        }, err => {
        })
    }
}