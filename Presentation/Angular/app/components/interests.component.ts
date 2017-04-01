import {Component, OnInit}      from '@angular/core';
import {Router} from '@angular/router';
import {InterestService} from '../services/interest.service';
@Component({
    templateUrl: 'app/components/interests.component.html',
    providers:[InterestService]
})
export class InterestsComponent implements OnInit {
    private user:any={};
    private food:any;
    private location:any;
    private places:any;
    private myInterests:any;
    private matchInterests:boolean = false;

    constructor(private router:Router, private interestService:InterestService) {
    }

    initFoodInterests(){
        let loaded:boolean=false;
        this.interestService.getInterests(1).then(res=>{
            this.food=res;
            this.initLocationInterests();
        })
        .catch(e=>console.log("Error at getting interests type food"));
    }

    initLocationInterests(){
             this.interestService.getInterests(2)
             .then(res=>{
                 this.location=res;
                 this.initPlacesInterests();
            })
            .catch(e=>console.log("Error at getting interests type location"));
    }

    initPlacesInterests(){
             this.interestService.getInterests(3)
             .then(res=>{
                 this.places=res;
                 this.initMyInterests();
            })
            .catch(e=>console.log("Error at getting interests type location"));
               
    }
    checkCredentials(){
        if (localStorage.getItem("currentUser") === "{}"){
            this.router.navigate(['login']);
        }
        else {
            this.user=JSON.parse(localStorage.getItem("currentUser"));
        }
    }
    initMyInterests(){
        this.interestService.getMyInterests(this.user.Id)
        .then(res=>{
            this.myInterests=res;
             this.matchMyInterests();
        })
        .catch(e=>console.log(e));    
    }
    matchMyInterests(){
        
        this.food.forEach(f=>{
            f.isMine=false;
        });
        
        this.location.forEach(f=>{
            f.isMine=false;
        });  
        
        this.places.forEach(f=>{
            f.isMine=false;
        });
        this.myInterests.forEach(m=>{
            this.food.forEach(f=>{
                if(m.Id == f.Id)
                    f.isMine=true;
             });
             this.location.forEach(f=>{
                if(m.Id == f.Id)
                    f.isMine=true;
             });
             
             this.places.forEach(f=>{
                if(m.Id == f.Id)
                    f.isMine=true;
             });
        });
        this.matchInterests=true;
    }

    addInterests(idInterests:number){
        console.log(idInterests);
        this.interestService.addInterests(this.user.Id,idInterests).then(r=>{
            this.initFoodInterests();
        })
        .catch(error=>{
            console.log("Error at add interests");
        })
    }

    removeInterests(idInterests:number){
        console.log(idInterests);
        this.interestService.removeInterests(this.user.Id,idInterests).then(r=>{
            this.initFoodInterests();
        })
        .catch(error=>{
            console.log("Error at joining event");
        })
    }

    click(){
        console.log("click");
    }

    ngOnInit() {
        this.checkCredentials();
        this.initFoodInterests();
    }
}