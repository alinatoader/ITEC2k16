System.register(["@angular/core", "@angular/router", "../services/interest.service"], function (exports_1, context_1) {
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
    var core_1, router_1, interest_service_1, InterestsComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (interest_service_1_1) {
                interest_service_1 = interest_service_1_1;
            }
        ],
        execute: function () {
            InterestsComponent = class InterestsComponent {
                constructor(router, interestService) {
                    this.router = router;
                    this.interestService = interestService;
                    this.user = {};
                    this.matchInterests = false;
                }
                initFoodInterests() {
                    let loaded = false;
                    this.interestService.getInterests(1).then(res => {
                        this.food = res;
                        this.initLocationInterests();
                    })
                        .catch(e => console.log("Error at getting interests type food"));
                }
                initLocationInterests() {
                    this.interestService.getInterests(2)
                        .then(res => {
                        this.location = res;
                        this.initPlacesInterests();
                    })
                        .catch(e => console.log("Error at getting interests type location"));
                }
                initPlacesInterests() {
                    this.interestService.getInterests(3)
                        .then(res => {
                        this.places = res;
                        this.initMyInterests();
                    })
                        .catch(e => console.log("Error at getting interests type location"));
                }
                checkCredentials() {
                    if (localStorage.getItem("currentUser") === "{}") {
                        this.router.navigate(['login']);
                    }
                    else {
                        this.user = JSON.parse(localStorage.getItem("currentUser"));
                    }
                }
                initMyInterests() {
                    this.interestService.getMyInterests(this.user.Id)
                        .then(res => {
                        this.myInterests = res;
                        this.matchMyInterests();
                    })
                        .catch(e => console.log(e));
                }
                matchMyInterests() {
                    this.food.forEach(f => {
                        f.isMine = false;
                    });
                    this.location.forEach(f => {
                        f.isMine = false;
                    });
                    this.places.forEach(f => {
                        f.isMine = false;
                    });
                    this.myInterests.forEach(m => {
                        this.food.forEach(f => {
                            if (m.Id == f.Id)
                                f.isMine = true;
                        });
                        this.location.forEach(f => {
                            if (m.Id == f.Id)
                                f.isMine = true;
                        });
                        this.places.forEach(f => {
                            if (m.Id == f.Id)
                                f.isMine = true;
                        });
                    });
                    this.matchInterests = true;
                }
                addInterests(idInterests) {
                    console.log(idInterests);
                    this.interestService.addInterests(this.user.Id, idInterests).then(r => {
                        this.initFoodInterests();
                    })
                        .catch(error => {
                        console.log("Error at add interests");
                    });
                }
                removeInterests(idInterests) {
                    console.log(idInterests);
                    this.interestService.removeInterests(this.user.Id, idInterests).then(r => {
                        this.initFoodInterests();
                    })
                        .catch(error => {
                        console.log("Error at joining event");
                    });
                }
                click() {
                    console.log("click");
                }
                ngOnInit() {
                    this.checkCredentials();
                    this.initFoodInterests();
                }
            };
            InterestsComponent = __decorate([
                core_1.Component({
                    templateUrl: 'app/components/interests.component.html',
                    providers: [interest_service_1.InterestService]
                }),
                __metadata("design:paramtypes", [router_1.Router, interest_service_1.InterestService])
            ], InterestsComponent);
            exports_1("InterestsComponent", InterestsComponent);
        }
    };
});
//# sourceMappingURL=interests.component.js.map