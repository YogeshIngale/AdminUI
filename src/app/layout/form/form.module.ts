import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { PageHeaderModule } from './../../shared';
import { FormioModule } from 'angular-formio';
import { SharedModule } from 'src/app/shared-module/shared-module.module';

@NgModule({
    imports: [CommonModule, FormRoutingModule, PageHeaderModule, FormsModule, FormioModule, SharedModule],
    declarations: [FormComponent]
})
export class FormModule { }
