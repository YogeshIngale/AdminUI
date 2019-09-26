import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemUsersRoutingModule } from './system-users-routing.module';
import { SystemUsersComponent } from './system-users.component';

@NgModule({
  declarations: [SystemUsersComponent],
  imports: [
    CommonModule,
    SystemUsersRoutingModule
  ]
})
export class SystemUsersModule { }
