import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserFormRoutingModule } from './userform-routing.module';
import { UserFormComponent } from './userform.component';
import { PageHeaderModule } from '../../shared';
import { FormioModule } from 'angular-formio';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { FileUploadModule } from 'ng2-file-upload';
import { ExcelService } from 'src/app/shared/services/export-excel.service';

@NgModule({
    imports: [CommonModule, UserFormRoutingModule, PageHeaderModule, FormsModule, FormioModule, SharedModule, FileUploadModule],
    declarations: [UserFormComponent]
})
export class UserFormModule { }
