import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemUsersRoutingModule } from './system-users-routing.module';
import { SystemUsersComponent } from './system-users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule, StatModule, SharedPipesModule } from 'src/app/shared';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { FormioModule } from 'angular-formio';
import { ExcelService } from 'src/app/shared/services/export-excel.service';

@NgModule({
    declarations: [SystemUsersComponent],
    imports: [
        CommonModule,
        SystemUsersRoutingModule,
        FormioModule,
        NgbModule.forRoot(), CommonModule, PageHeaderModule, FormsModule, StatModule, SharedModule, SharedPipesModule
    ],
    providers: [ExcelService]
})
export class SystemUsersModule { }
