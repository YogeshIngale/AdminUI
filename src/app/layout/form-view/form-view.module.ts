import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormViewComponent } from './form-view.component';
import { FormsModule } from '@angular/forms';
import { BaseService } from 'src/app/shared/services/base.service';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { FormViewRoutingModule } from './fom-view.module.routing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        FormViewRoutingModule,
        FormsModule,
        SharedModuleModule
    ],
    declarations: [FormViewComponent],
    providers: [BaseService, DatePipe, NgbActiveModal]
})
export class FormViewModule { }
