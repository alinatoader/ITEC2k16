import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import "rxjs/Rx"


@Injectable()
export class AccountService {
    private baseUrl: string = 'http://localhost:58107/api/Account';
    private options: RequestOptions;
    private headers: Headers;
    

    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getEventsForAccount(id:number):Promise<any>{
        return Promise.resolve(this.http.get(this.baseUrl+"/Events/"+id).map(res=>res.json()).toPromise());
    }

    get(id:number):Promise<any>{
        return Promise.resolve(this.http.get(this.baseUrl+"/"+id).map(res=>res.json()).toPromise());
    }

    joinEvent(idAccount:number,idEvent:number)
    {
        return this.http
            .post(this.baseUrl+"/Join/"+idAccount+"/"+idEvent, this.options)
            .toPromise();
    }

     unjoinEvent( idAccount:number,idEvent:number): Promise<any> {
        return this.http
            .delete(this.baseUrl+"/Unjoin/"+idAccount+"/"+idEvent, this.options)
            .toPromise();
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