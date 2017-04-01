import {Component, OnInit}      from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
    templateUrl: 'app/components/login.component.html',
    providers:[AuthenticationService]
})

export class LoginComponent implements OnInit {
    private user:any={};

    constructor(private router:Router,private authService:AuthenticationService) {
    }

    login(){
        if(this.user.Username==""||this.user.Password=="")
            return;
        this.user.LoggedIn=1;
        this.authService.login(this.user).then(user=>
        {
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.router.navigate(['events']);    
        })
        .catch(error=>{
            alert("Invalid credentials..");
        })
    }

    ngOnInit() {
        console.log("Login page loaded..");
    }
}
