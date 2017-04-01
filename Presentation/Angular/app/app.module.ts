import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { LandingModule } from './landing/landing.module';
import { RouterModule } from '@angular/router';
import { NotFoundModule } from './not-found/not-found.module';
import {EventModule} from './modules/event.module';
import {AuthenticationModule} from './modules/authentication.module';
import {InterestsModule} from './modules/interests.module';
@NgModule({
    imports: [BrowserModule, HttpModule, AppRoutingModule,InterestsModule, LandingModule, NotFoundModule,EventModule,AuthenticationModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule {
}