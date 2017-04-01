import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import "rxjs/Rx"


@Injectable()
export class AuthenticationService {
    private baseUrl: string = 'http://localhost:58107/api/Account';
    private options: RequestOptions;
    private headers: Headers;
    

    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    login(param: any): Promise<any> {
        let body = JSON.stringify(param);
        return this.http
            .put(this.baseUrl, body, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    postAccount(param: any): Promise<any> {
        let body = JSON.stringify(param);
        return this.http
            .post(this.baseUrl, body, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}