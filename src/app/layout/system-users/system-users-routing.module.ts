import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemUsersComponent } from './system-users.component';

const routes: Routes = [
    { path: '', component: SystemUsersComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemUsersRoutingModule { }
