import {Component, OnInit,HostListener}      from '@angular/core';
import {Router} from '@angular/router';

import {EventService} from '../services/event.service';
import {AccountService} from '../services/account.service';
import {InterestService} from '../services/interest.service';
import {TypeOfInterestService} from '../services/typeofinterest.service';
import {AuthenticationService} from '../services/authentication.service';
import {CommentService} from '../services/comment.service';

@Component({
    templateUrl: 'app/components/event.component.html',
    providers:[EventService,AccountService,InterestService,TypeOfInterestService,
                AuthenticationService,CommentService]
})

export class EventComponent implements OnInit {
    private allEvents:any;
    private myEvents:any;
    private user:any;
    private newEvent:any={};
    private time:any;
    private date:any;
    private allInterests:any=[];
    private interestTypes:any;
    private selectedType:any;
    private comments:any;
    private event:any={};
    private newComment:any={};

    private matchedEvents:boolean=false;
    private createEvent:boolean=false;
    private showComments:boolean=false;
    private icommented:boolean=false;
    private editcomment:boolean=false;

    constructor(private router:Router,private eventService:EventService,private accountService:AccountService,
                private interestService:InterestService,private typeofinterestService:TypeOfInterestService,
                private authService:AuthenticationService,private commentService:CommentService) {
      
    }

    loadEvents(){
        this.eventService.getForMe(this.user.Id).then(events=>{
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
        this.getEventInterests();
    }

    getEventAttendants(){
        this.allEvents.forEach(event=>{
            this.eventService.getAttendants(event.Id).then(attendants=>{
                event.Attendants=attendants;
            }).catch(error=>{console.log("Error at getting attendats.")});
        })
    }

    getEventInterests(){
        this.allEvents.forEach(event=>{
            this.interestService.getInterestsForEvent(event.Id).then(interests=>{
                event.Interests=interests;
            }).catch(error=>console.log(error));
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
        if(this.newEvent.Title==null||this.newEvent.Description==null||this.date==null||this.time==null)
            return;
        this.newEvent.StartTime=this.date+" "+this.time;
        console.log(this.newEvent.StartTime);
        this.newEvent.Id=0;
        this.eventService.postEvent(this.newEvent).then(ev=>{
            ev.Joined=true;
            ev.Interests=[];
            this.allInterests.forEach(interest => {
                if(interest.Checked==true)
                    ev.Interests.push(interest);     
            });
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

    loadComments(event:any){
        this.icommented=false;
        this.commentService.getComments(event.Id).then(comments=>{
            this.comments=comments;    
            this.event=event;
            this.loadUsersComments();
        }).catch(e=>console.log(e));
    }

    loadUsersComments(){
        if(this.comments==0)
            {
                this.showComments=true;
                return;
            }
        this.comments.forEach(comment=>{
            this.accountService.get(comment.UserId).then(user=>{
                if(user.Id==this.user.Id)
                    {comment.User="Me";
                    this.icommented=true;}
                else
                comment.User=user.FirstName+user.LastName;
            }).catch(error=>console.log(error));
        });
        this.showComments=true;
    }

    saveComment(){

        if(this.editcomment==false){
            this.newComment.UserId=this.user.Id;
            this.newComment.EventId=this.event.Id;
            this.commentService.postComment(this.newComment).then(comment=>{
                comment.User="Me";
                if(this.comments==0)
                    this.comments=[];
                this.comments.push(comment);
                this.newComment={};
                this.icommented=true;
            }).catch(e=>console.log(e));
        }
        else{
            this.newComment.UserId=this.user.Id;
            this.newComment.EventId=this.event.Id;
            this.commentService.putComment(this.newComment).then(comment=>{
                this.loadComments(this.event);
                this.editcomment=false;
                this.newComment={};
                })
                
            .catch(e=>console.log(e));
        }
    
    }

    editComment(id:number){
        this.editcomment=true;
        this.newComment.Id=id;
    }

    deleteComment(id:number){
        this.commentService.deleteComment(id).then(c=>{
            this.loadComments(this.event);
        }).catch(e=>console.log(e));
    }

    ngOnInit() {
        this.checkCredentials();
        this.loadEvents();
        this.initTypesOfInterest();
        
    }
}