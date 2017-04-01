System.register(["@angular/core", "./landing-routing.module", "./landing.component"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, landing_routing_module_1, landing_component_1, LandingModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (landing_routing_module_1_1) {
                landing_routing_module_1 = landing_routing_module_1_1;
            },
            function (landing_component_1_1) {
                landing_component_1 = landing_component_1_1;
            }
        ],
        execute: function () {
            LandingModule = class LandingModule {
            };
            LandingModule = __decorate([
                core_1.NgModule({
                    imports: [landing_routing_module_1.LandingRoutingModule],
                    declarations: [landing_component_1.LandingComponent]
                })
            ], LandingModule);
            exports_1("LandingModule", LandingModule);
        }
    };
});
//# sourceMappingURL=landing.module.js.map