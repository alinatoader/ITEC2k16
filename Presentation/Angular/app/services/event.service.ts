import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import "rxjs/Rx"


@Injectable()
export class EventService {
    private baseUrl: string = 'http://localhost:58107/api/Event';
    private options: RequestOptions;
    private headers: Headers;
    

    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getAll():Promise<any>{
        return Promise.resolve(this.http.get(this.baseUrl).map(res=>res.json()).toPromise());
    }

    getForMe(id:number):Promise<any>{
        return Promise.resolve(this.http.get(this.baseUrl+"/Interests/"+id).map(res=>res.json()).toPromise());
    }

   getAttendants(idEvent:number){
       return Promise.resolve(this.http.get(this.baseUrl+"/Attendants/"+idEvent).map(res=>res.json()).toPromise());
   }

   postEvent(param: any): Promise<any> {
        let body = JSON.stringify(param);
        return this.http
            .post(this.baseUrl, body, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    addInterest(eventId:number,interestId:number){
         return this.http
            .post(this.baseUrl+"/Add/"+eventId+"/"+interestId,this.options)
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