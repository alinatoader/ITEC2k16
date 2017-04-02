import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import "rxjs/Rx"


@Injectable()
export class CommentService {
    private baseUrl: string = 'http://localhost:58107/api/Comment';
    private options: RequestOptions;
    private headers: Headers;
    

    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getComments(eventId:number){
        return Promise.resolve(this.http.get(this.baseUrl+"/"+eventId).map(res=>res.json()).toPromise());
    }
}