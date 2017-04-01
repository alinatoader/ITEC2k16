System.register(["@angular/core", "@angular/router", "../services/event.service", "../services/account.service", "../services/interest.service", "../services/typeofinterest.service"], function (exports_1, context_1) {
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
    var core_1, router_1, event_service_1, account_service_1, interest_service_1, typeofinterest_service_1, EventComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            },
            function (account_service_1_1) {
                account_service_1 = account_service_1_1;
            },
            function (interest_service_1_1) {
                interest_service_1 = interest_service_1_1;
            },
            function (typeofinterest_service_1_1) {
                typeofinterest_service_1 = typeofinterest_service_1_1;
            }
        ],
        execute: function () {
            EventComponent = class EventComponent {
                constructor(router, eventService, accountService, interestService, typeofinterestService) {
                    this.router = router;
                    this.eventService = eventService;
                    this.accountService = accountService;
                    this.interestService = interestService;
                    this.typeofinterestService = typeofinterestService;
                    this.newEvent = {};
                    this.allInterests = [];
                    this.matchedEvents = false;
                }
                loadEvents() {
                    this.eventService.getAll().then(events => {
                        this.allEvents = events;
                        this.loadMyEvents();
                    })
                        .catch(error => {
                        console.log("Error at loading events..");
                    });
                }
                checkCredentials() {
                    if (localStorage.getItem("currentUser") === "{}") {
                        this.router.navigate(['login']);
                    }
                    else {
                        this.user = JSON.parse(localStorage.getItem("currentUser"));
                    }
                }
                loadMyEvents() {
                    this.accountService.getEventsForAccount(this.user.Id).then(events => {
                        this.myEvents = events;
                        this.matchMyEvents();
                    })
                        .catch(error => {
                        console.log("Error at loading my events..");
                    });
                }
                matchMyEvents() {
                    this.allEvents.forEach(element => {
                        element.Joined = false;
                    });
                    this.allEvents.forEach(ae => {
                        this.myEvents.forEach(me => {
                            if (ae.Id == me.Id)
                                ae.Joined = true;
                        });
                    });
                    this.matchedEvents = true;
                    this.getEventAttendants();
                }
                getEventAttendants() {
                    this.allEvents.forEach(event => {
                        this.eventService.getAttendants(event.Id).then(attendants => {
                            event.Attendants = attendants;
                        }).catch(error => { console.log("Error at getting attendats."); });
                    });
                }
                joinEvent(idEvent) {
                    this.accountService.joinEvent(this.user.Id, idEvent).then(r => {
                        this.loadMyEvents();
                    })
                        .catch(error => {
                        console.log("Error at joining event");
                    });
                }
                unjoinEvent(idEvent) {
                    this.accountService.unjoinEvent(this.user.Id, idEvent).then(r => {
                        this.loadMyEvents();
                    })
                        .catch(error => {
                        console.log("Error at joining event");
                    });
                }
                saveEvent() {
                    if (this.newEvent.Title == null || this.newEvent.Description == null || this.newEvent.StartTime == null || this.time == null)
                        return;
                    this.newEvent.Date = this.newEvent.StartTime + " " + this.time;
                    this.newEvent.Id = 0;
                    this.eventService.postEvent(this.newEvent).then(ev => {
                        ev.Joined = true;
                        this.allEvents.push(ev);
                        this.joinEvent(ev.Id);
                        this.newEvent = {};
                        this.saveInterestsToNewEvent(ev.Id);
                    })
                        .catch(error => {
                        console.log("Error at saving event");
                    });
                }
                saveInterestsToNewEvent(id) {
                    this.allInterests.forEach(interest => {
                        if (interest.Checked == true)
                            this.eventService.addInterest(id, interest.Id).then(r => {
                                this.interestService.addInterests(this.user.Id, interest.Id).then(rr => {
                                    interest.Checked = false;
                                }).catch(e => console.log("Error at saving interests to my account.."));
                            })
                                .catch(e => console.log("Error at saving interests"));
                    });
                }
                initTypesOfInterest() {
                    this.typeofinterestService.getTypes().then(types => {
                        this.interestTypes = JSON.parse(types);
                        this.selectedType = this.interestTypes[0].Name;
                        this.initAllInterests();
                    }).catch(error => console.log("Error at getting interest types.."));
                }
                initAllInterests() {
                    this.interestTypes.forEach(i => {
                        this.interestService.getInterests(i.Id).then(ii => {
                            ii.forEach(iii => iii.Checked = false);
                            this.allInterests = this.allInterests.concat(ii);
                        })
                            .catch(e => console.log("Error at getting interests."));
                    });
                }
                onSelectingType() {
                    var selectObject = document.getElementById("selecTypes");
                    this.selectedType = selectObject.options[selectObject.selectedIndex].value;
                }
                ngOnInit() {
                    this.checkCredentials();
                    this.loadEvents();
                    this.initTypesOfInterest();
                }
            };
            EventComponent = __decorate([
                core_1.Component({
                    templateUrl: 'app/components/event.component.html',
                    providers: [event_service_1.EventService, account_service_1.AccountService, interest_service_1.InterestService, typeofinterest_service_1.TypeOfInterestService]
                }),
                __metadata("design:paramtypes", [router_1.Router, event_service_1.EventService, account_service_1.AccountService,
                    interest_service_1.InterestService, typeofinterest_service_1.TypeOfInterestService])
            ], EventComponent);
            exports_1("EventComponent", EventComponent);
        }
    };
});
//# sourceMappingURL=event.component.js.map