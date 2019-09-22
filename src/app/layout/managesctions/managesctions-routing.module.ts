import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageSectionsComponent } from './managesctions.component';

const routes: Routes = [
    {
        path: '', component: ManageSectionsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageSectionsRoutingModule {
}
