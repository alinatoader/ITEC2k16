import { NgModule } from '@angular/core';
import { EventComponent } from '../components/event.component';

import {CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';

@NgModule({
  declarations: [EventComponent],
  imports:[CommonModule,FormsModule]
})
export class EventModule { }
