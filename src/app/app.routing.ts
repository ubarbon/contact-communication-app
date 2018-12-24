import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './access/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuardService} from './service/authentication/auth-guard.service';
import {ContactsComponent} from './contact/contacts.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'contacts',
                component: ContactsComponent,
                outlet: 'dashboard'
            }
        ]
    },
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
    /*
     { path: '**', component: PageNotFoundComponent }
     */
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
