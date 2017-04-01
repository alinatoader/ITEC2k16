System.register(["@angular/core", "@angular/http", "rxjs/Rx"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, AuthenticationService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            AuthenticationService = class AuthenticationService {
                constructor(http) {
                    this.http = http;
                    this.baseUrl = 'http://localhost:58107/api/Account';
                    this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
                    this.options = new http_1.RequestOptions({ headers: this.headers });
                }
                login(param) {
                    let body = JSON.stringify(param);
                    return this.http
                        .put(this.baseUrl, body, this.options)
                        .toPromise()
                        .then(this.extractData)
                        .catch(this.handleError);
                }
                postAccount(param) {
                    let body = JSON.stringify(param);
                    return this.http
                        .post(this.baseUrl, body, this.options)
                        .toPromise()
                        .then(this.extractData)
                        .catch(this.handleError);
                }
                extractData(res) {
                    let body = res.json();
                    return body || {};
                }
                handleError(error) {
                    console.error('An error occurred', error);
                    return Promise.reject(error.message || error);
                }
            };
            AuthenticationService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], AuthenticationService);
            exports_1("AuthenticationService", AuthenticationService);
        }
    };
});
//# sourceMappingURL=authentication.service.js.map