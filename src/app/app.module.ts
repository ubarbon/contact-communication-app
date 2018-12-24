import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app.routing';
import {TranslateService} from './service/translate/translation.service';
import {TRANSLATION_PROVIDERS} from './service/translate/translation';
import {AuthenticationService} from './service/authentication/authentication.service';
import {AuthGuardService} from './service/authentication/auth-guard.service';
import {AppInterceptor} from './app.interceptor';
import {LoginComponent} from './access/login.component';
import {TranslatePipe} from './service/translate/translation.pipe';
import {LoadingComponent} from './common/loading/loading.component';
import {MessageComponent} from './common/message/message.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FooterComponent} from './footer/footer.component';
import {ContactsComponent} from './contact/contacts.component';
import {ContactService} from './service/contact/contact.service';
import {CommunicationService} from './service/communication/communication.service';
import {CommunicationDetailComponent} from './contact/communication-detail/detail.component';

@NgModule({
    declarations: [
        TranslatePipe,
        AppComponent,
        LoginComponent,
        LoadingComponent,
        MessageComponent,
        FooterComponent,
        DashboardComponent,
        ContactsComponent,
        CommunicationDetailComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [
        AuthGuardService,
        AuthenticationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppInterceptor,
            multi: true
        },
        TRANSLATION_PROVIDERS,
        TranslateService,
        ContactService,
        CommunicationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
