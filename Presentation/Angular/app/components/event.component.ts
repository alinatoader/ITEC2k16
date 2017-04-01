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
    private selectedInterests:any;
    private interestTypes:any;

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

    getAttendats(idEvent:number){
        this.eventService.getAttendants(idEvent).then(e=>{
            return e;
        })
        .catch(error=>{
            console.log("Error at getting attendats");
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
        })
        .catch(error=>{
            console.log("Error at saving event");
        })
    }

    getInterests(id:number)
    {
        this.interestService.getInterests(id).then(i=>{
            this.selectedInterests=i;
        })
        .catch(e=>console.log("Error at getting interests in event component"));
    }

    initTypesOfInterest(){
        this.typeofinterestService.getTypes().then(types=>{
            this.interestTypes=JSON.parse(types);  
            this.initSelectedInterests(); 
        }).catch(error=>console.log("Error at getting interest types.."));
    }

    initSelectedInterests(){
        this.interestService.getInterests(this.interestTypes[0].Id).then(i=>{
            this.selectedInterests=i;
        })
        .catch(e=>{
            console.log("Error at init selected interests");
        })
    }

    onSelectingType(){
        var selectObject= document.getElementById("selecTypes");
        var selectedType=selectObject.options[selectObject.selectedIndex].id;
        this.interestService.getInterests(selectedType).then(interests=>{
            this.selectedInterests=interests;
        }).catch(error=>console.log("Error at selecting new type of interest"));
    }

    

    ngOnInit() {
        this.checkCredentials();
        this.loadEvents();
        this.initTypesOfInterest();
    }
}