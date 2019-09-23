import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from '../shared';
import { ModalComponent, ProgressbarComponent, } from './components';
import { SharedRoutingModule } from './shared-routing.module';
@NgModule({
    imports: [
        CommonModule,
        SharedRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        PageHeaderModule,
    ],
    declarations: [

        ModalComponent,

        ProgressbarComponent,

    ],
    exports: [

        ModalComponent,

        ProgressbarComponent,

    ],
    providers: [
        NgbActiveModal,
    ]
})
export class SharedModule { }
