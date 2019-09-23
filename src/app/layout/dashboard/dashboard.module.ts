import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { StatModule } from '../../shared';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { BaseService } from 'src/app/shared/services/base.service';
@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        DashboardRoutingModule,
        StatModule,
        FormsModule,
        SharedModule,
        // FormioModule
    ],
    declarations: [
        DashboardComponent,
        // TimelineComponent,
        // NotificationComponent,
        // ChatComponent,
        // QuestionSetComponent,
        // FormIoComponent
    ],
    providers: [BaseService, DatePipe, NgbActiveModal]
})
export class DashboardModule { }
