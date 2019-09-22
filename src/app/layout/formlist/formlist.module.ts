import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormRoutingModule } from './formlist-routing.module';
import { FormListComponent } from './formlist.component';
import { PageHeaderModule } from '../../shared';
import { FormioGrid } from 'angular-formio/grid/grid.module';
@NgModule({
    imports: [CommonModule, FormRoutingModule, PageHeaderModule,FormsModule, FormioGrid],
    declarations: [FormListComponent]
})
export class FormListModule {}
