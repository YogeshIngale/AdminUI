import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CommonToastrService } from '../shared/services/common-toastr-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        SignupRoutingModule,
        SharedModuleModule,
        FormsModule
    ],
    declarations: [SignupComponent]
})
export class SignupModule { }
