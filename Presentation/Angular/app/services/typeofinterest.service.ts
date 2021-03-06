import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import "rxjs/Rx"


@Injectable()
export class TypeOfInterestService {
    private baseUrl: string = 'http://localhost:58107/api/TypeOfInterest';
    private options: RequestOptions;
    private headers: Headers;
    

    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getTypes(){
        return Promise.resolve(this.http.get(this.baseUrl).map(res=>res.json()).toPromise());
    }
}