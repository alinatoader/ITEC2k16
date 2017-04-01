import {Component, OnInit}      from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
    templateUrl: 'app/components/register.component.html',
    providers:[AuthenticationService]
})

export class RegisterComponent implements OnInit {
    private user:any={};
    private password:string;
    constructor(private router:Router,private authService:AuthenticationService) {
    }

    register(){
        if(this.password != this.user.Password)
            return;
        if(this.user.Username==""||this.user.Password==""||this.user.FirstName==""||this.user.LastName=="")
            return;
        this.authService.postAccount(this.user).then(user=>
        {
            localStorage.setItem("currentUser", user);
            this.router.navigate(['login']);    
        })
        .catch(error=>{
            alert("This username is already in use..");
        })
    }

    ngOnInit() {
        console.log("Login page loaded..");
    }
}