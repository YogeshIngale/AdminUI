import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { PageHeaderModule } from './../../shared';
import { FormioModule } from 'angular-formio';

@NgModule({
    imports: [CommonModule, FormRoutingModule, PageHeaderModule,FormsModule, FormioModule],
    declarations: [FormComponent]
})
export class FormModule {}
