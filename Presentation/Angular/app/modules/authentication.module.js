System.register(["@angular/core", "../components/login.component", "../components/register.component", "@angular/common", "@angular/forms"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, login_component_1, register_component_1, common_1, forms_1, AuthenticationModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (register_component_1_1) {
                register_component_1 = register_component_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }
        ],
        execute: function () {
            AuthenticationModule = class AuthenticationModule {
            };
            AuthenticationModule = __decorate([
                core_1.NgModule({
                    declarations: [login_component_1.LoginComponent, register_component_1.RegisterComponent],
                    imports: [common_1.CommonModule, forms_1.FormsModule]
                })
            ], AuthenticationModule);
            exports_1("AuthenticationModule", AuthenticationModule);
        }
    };
});
//# sourceMappingURL=authentication.module.js.map