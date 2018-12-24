import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './access/login.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {
        path: '**',
        redirectTo: 'login',
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
