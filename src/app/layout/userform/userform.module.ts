import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserFormRoutingModule } from './userform-routing.module';
import { UserFormComponent } from './userform.component';
import { PageHeaderModule } from '../../shared';
import { FormioModule } from 'angular-formio';
import { SharedModule } from 'src/app/shared-module/shared-module.module';

@NgModule({
    imports: [CommonModule, UserFormRoutingModule, PageHeaderModule, FormsModule, FormioModule, SharedModule],
    declarations: [UserFormComponent]
})
export class UserFormModule { }
