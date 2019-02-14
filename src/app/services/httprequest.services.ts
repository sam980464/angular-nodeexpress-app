import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';


@Injectable()
export class HttpRequestServices {
    private _BASE_URL = "http://localhost:3000/";
    private _HEADERS = new Headers({ 'Content-Type': 'application/json' });
    private _OPTIONS = new RequestOptions({ headers: this._HEADERS });
    private _BODY_STRING = "";

    //Apis
    private _LOGIN = "login";
    private _REGISTER = "signup";

    constructor(private http: Http) { }
    login(value: any) {

        this._BODY_STRING = JSON.stringify(value);
        return this.http.post(this._BASE_URL + this._LOGIN, this._BODY_STRING, this._OPTIONS)

    }
    signup(value: any) {

        this._BODY_STRING = JSON.stringify(value);
        return this.http.post(this._BASE_URL + this._REGISTER, this._BODY_STRING, this._OPTIONS)
    }
}