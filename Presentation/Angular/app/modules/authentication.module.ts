import { NgModule } from '@angular/core';
import { LoginComponent } from '../components/login.component';
import { RegisterComponent } from '../components/register.component';
import {CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';

@NgModule({
  declarations: [LoginComponent,RegisterComponent],
  imports:[CommonModule,FormsModule]
})
export class AuthenticationModule { }
