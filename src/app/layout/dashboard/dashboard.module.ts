import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { StatModule } from '../../shared';
import { QuestionSetComponent } from './components/question-set/question-set.component';
import { FormsModule } from '@angular/forms';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { BaseService } from 'src/app/shared/services/base.service';
import { FormIoComponent } from './components/form-io/form-io.component';
import { FormioModule } from 'angular-formio';
@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        DashboardRoutingModule,
        StatModule,
        FormsModule,
        SharedModuleModule,
        FormioModule
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
        QuestionSetComponent,
        FormIoComponent
    ],
    providers: [BaseService, DatePipe, NgbActiveModal]
})
export class DashboardModule { }
