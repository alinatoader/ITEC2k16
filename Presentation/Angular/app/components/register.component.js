System.register(["@angular/core", "../services/authentication.service", "@angular/router"], function (exports_1, context_1) {
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
    var core_1, authentication_service_1, router_1, RegisterComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }
        ],
        execute: function () {
            RegisterComponent = class RegisterComponent {
                constructor(router, authService) {
                    this.router = router;
                    this.authService = authService;
                    this.user = {};
                }
                register() {
                    if (this.password != this.user.Password)
                        return;
                    if (this.user.Username == "" || this.user.Password == "" || this.user.FirstName == "" || this.user.LastName == "")
                        return;
                    this.authService.postAccount(this.user).then(user => {
                        localStorage.setItem("currentUser", user);
                        this.router.navigate(['login']);
                    })
                        .catch(error => {
                        alert("This username is already in use..");
                    });
                }
                ngOnInit() {
                    console.log("Login page loaded..");
                }
            };
            RegisterComponent = __decorate([
                core_1.Component({
                    templateUrl: 'app/components/register.component.html',
                    providers: [authentication_service_1.AuthenticationService]
                }),
                __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthenticationService])
            ], RegisterComponent);
            exports_1("RegisterComponent", RegisterComponent);
        }
    };
});
//# sourceMappingURL=register.component.js.map