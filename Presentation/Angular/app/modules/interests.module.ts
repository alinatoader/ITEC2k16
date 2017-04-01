import { NgModule } from '@angular/core';
import { InterestsComponent } from '../components/interests.component';

import {CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';

@NgModule({
  declarations: [InterestsComponent],
  imports:[CommonModule,FormsModule]
})
export class InterestsModule { }
