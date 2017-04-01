import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import "rxjs/Rx"


@Injectable()
export class InterestService {
    private baseUrl: string = 'http://localhost:58107/api/Interest';
    private options: RequestOptions;
    private headers: Headers;
    

    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
        this.options = new RequestOptions({ headers: this.headers });
    }
    
     addInterests(idAccount:number,idInterests:number){
         return this.http
            .post(this.baseUrl+"/Add/"+idInterests+"/"+idAccount,this.options)
            .toPromise();

     }

     getInterestsForEvent(id:number){
         return Promise.resolve(this.http.get(this.baseUrl+"/ForEvent/"+id).map(res=>res.json()).toPromise());
     }

     removeInterests(idAccount:number,idInterests:number){
         return this.http
            .delete(this.baseUrl+"/Remove/"+idInterests+"/"+idAccount,this.options)
            .toPromise();
     }

    getInterests(id:number){
        return Promise.resolve(this.http.get(this.baseUrl + '/' + "Top/" + id).map(res=>res.json()).toPromise());
    }
    
    getMyInterests(id:number){
        return Promise.resolve(this.http.get(this.baseUrl+ "/ForAccount/"+id).map(res=>res.json()).toPromise());
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