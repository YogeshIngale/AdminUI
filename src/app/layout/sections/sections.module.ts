import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SectionsRoutingModule } from './sections-routing.module';
import { SectionsComponent } from './sections.component';
import { PageHeaderModule } from '../../shared';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatModule } from '../../shared';
@NgModule({
    imports: [NgbModule.forRoot() ,CommonModule, SectionsRoutingModule, PageHeaderModule,FormsModule, StatModule],
    declarations: [SectionsComponent],

})
export class SectionsModule {}
