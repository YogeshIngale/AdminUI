import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemUsersRoutingModule } from './system-users-routing.module';
import { SystemUsersComponent } from './system-users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule, StatModule } from 'src/app/shared';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { FormioModule } from 'angular-formio';

@NgModule({
    declarations: [SystemUsersComponent],
    imports: [
        CommonModule,
        SystemUsersRoutingModule,
        FormioModule,
        NgbModule.forRoot(), CommonModule, PageHeaderModule, FormsModule, StatModule, SharedModule
    ]
})
export class SystemUsersModule { }
