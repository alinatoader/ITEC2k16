import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import {EventComponent} from './components/event.component';
import {LoginComponent} from './components/login.component';
import {RegisterComponent} from './components/register.component';
import {InterestsComponent} from './components/interests.component'; 
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path:'login',component:LoginComponent},
    { path:'events',component:EventComponent},
    { path: 'register',component:RegisterComponent},
    { path: 'interests',component:InterestsComponent},
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}