import {Component, OnInit}      from '@angular/core';
import {Router} from '@angular/router';

import {EventService} from '../services/event.service';
import {AccountService} from '../services/account.service';
import {InterestService} from '../services/interest.service';
import {TypeOfInterestService} from '../services/typeofinterest.service';

@Component({
    templateUrl: 'app/components/event.component.html',
    providers:[EventService,AccountService,InterestService,TypeOfInterestService]
})

export class EventComponent implements OnInit {
    private allEvents:any;
    private myEvents:any;
    private user:any;
    private newEvent:any={};
    private time:any;
    private allInterests:any=[];
    private interestTypes:any;
    private selectedType:any;

    private matchedEvents:boolean=false;

    constructor(private router:Router,private eventService:EventService,private accountService:AccountService,
                private interestService:InterestService,private typeofinterestService:TypeOfInterestService) {
      
    }

    loadEvents(){
        this.eventService.getAll().then(events=>{
            this.allEvents=events;
            this.loadMyEvents();
        })
        .catch(error=>{
            console.log("Error at loading events..");
        })
    }

    checkCredentials(){
        if (localStorage.getItem("currentUser") === "{}"){
            this.router.navigate(['login']);
        }
        else {
            this.user=JSON.parse(localStorage.getItem("currentUser"));
        }
    }

    loadMyEvents(){
        this.accountService.getEventsForAccount(this.user.Id).then(events=>{
            this.myEvents=events;       
            this.matchMyEvents();
        })
        .catch(error=>{
            console.log("Error at loading my events..");
        })
    }

    matchMyEvents(){
        this.allEvents.forEach(element => {
            element.Joined=false;
        });
        this.allEvents.forEach(ae=>{
            this.myEvents.forEach(me=>{
                if(ae.Id==me.Id)
                    ae.Joined=true;
            })
        })
        this.matchedEvents=true;
        this.getEventAttendants();
    }

    getEventAttendants(){
        this.allEvents.forEach(event=>{
            this.eventService.getAttendants(event.Id).then(attendants=>{
                event.Attendants=attendants;
            }).catch(error=>{console.log("Error at getting attendats.")});
        })
    }

    joinEvent(idEvent:number){
        this.accountService.joinEvent(this.user.Id,idEvent).then(r=>{
            this.loadMyEvents();
        })
        .catch(error=>{
            console.log("Error at joining event");
        })
    }

    unjoinEvent(idEvent:number){
        this.accountService.unjoinEvent(this.user.Id,idEvent).then(r=>{
            this.loadMyEvents();
        })
        .catch(error=>{
            console.log("Error at joining event");
        })
    }


    saveEvent(){
        if(this.newEvent.Title==null||this.newEvent.Description==null||this.newEvent.StartTime==null||this.time==null)
            return;
        this.newEvent.Date=this.newEvent.StartTime+" "+this.time;
        this.newEvent.Id=0;
        this.eventService.postEvent(this.newEvent).then(ev=>{
            ev.Joined=true;
            this.allEvents.push(ev);
            this.joinEvent(ev.Id);
            this.newEvent={};
            this.saveInterestsToNewEvent(ev.Id);
        })
        .catch(error=>{
            console.log("Error at saving event");
        })
    }

    saveInterestsToNewEvent(id:number){
        this.allInterests.forEach(interest => {
            if(interest.Checked==true)
                this.eventService.addInterest(id,interest.Id).then(r=>{
                    this.interestService.addInterests(this.user.Id,interest.Id).then(rr=>{
                        interest.Checked=false;
                }).catch(e=>console.log("Error at saving interests to my account.."));
                })
                .catch(e=>console.log("Error at saving interests"));
        });
    }


    initTypesOfInterest(){
        this.typeofinterestService.getTypes().then(types=>{
            this.interestTypes=JSON.parse(types);  
            this.selectedType=this.interestTypes[0].Name;
            this.initAllInterests();
        }).catch(error=>console.log("Error at getting interest types.."));
    }

    initAllInterests(){
        this.interestTypes.forEach(i=>{
            this.interestService.getInterests(i.Id).then(ii=>{
                ii.forEach(iii=>iii.Checked=false);
                this.allInterests=this.allInterests.concat(ii);
            })
            .catch(e=>console.log("Error at getting interests."));
        })
    }

    onSelectingType(){
        var selectObject= document.getElementById("selecTypes");
        this.selectedType=selectObject.options[selectObject.selectedIndex].value;
    }

    

    ngOnInit() {
        this.checkCredentials();
        this.loadEvents();
        this.initTypesOfInterest();
        
    }
}