import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'sections', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
            { path: 'createform', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
            { path: 'forms', loadChildren: () => import('./formlist/formlist.module').then(m => m.FormListModule) },
            { path: 'form-view', loadChildren: () => import('./form-view/form-view.module').then(m => m.FormViewModule) },
            { path: 'sections', loadChildren: () => import('./sections/sections.module').then(m => m.SectionsModule) },
            { path: 'userform', loadChildren: () => import('./userform/userform.module').then(m => m.UserFormModule) },
            { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
            { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
