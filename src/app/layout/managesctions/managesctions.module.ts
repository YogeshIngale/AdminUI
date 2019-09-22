import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManageSectionsRoutingModule } from './managesctions-routing.module';
import { ManageSectionsComponent } from './managesctions.component';
import { PageHeaderModule } from '../../shared';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [NgbModule.forRoot() ,CommonModule, ManageSectionsRoutingModule, PageHeaderModule,FormsModule],
    declarations: [ManageSectionsComponent],

})
export class ManageSectionsModule {}
