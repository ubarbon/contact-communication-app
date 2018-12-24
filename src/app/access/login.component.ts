import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageComponent} from '../common/message/message.component';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginEvent} from '../service/authentication/login-event';
import {ILoginResponse} from '../service/authentication/i-login-response';
import {TranslateService} from '../service/translate/translation.service';

declare let $: any;

const PHONE_NUMBER_REGEXP = /^[0-9]{9}$/;


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, LoginEvent {
    private _returnUrl: string;
    private readonly _loginForm: FormGroup;
    private _badCredentials: boolean;

    @ViewChild(MessageComponent) messageComponent: MessageComponent;

    constructor(private translate: TranslateService, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, fb: FormBuilder) {
        this._loginForm = fb.group({
            'username': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern(PHONE_NUMBER_REGEXP)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
        });

        this.showBadCredentials(false);
    }

    ngOnInit(): void {
        // reset login status
        this.getAuthenticationService().logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get loginForm(): FormGroup {
        return this._loginForm;
    }

    get badCredentials(): boolean {
        return this._badCredentials;
    }

    get returnUrl(): string {
        return this._returnUrl;
    }

    set returnUrl(value: string) {
        this._returnUrl = value;
    }

    public getAuthenticationService() {
        return this.authenticationService;
    }

    public submitForm(form: any): void {
        this.getAuthenticationService().login(form.username, form.password, this);
    }

    public onSuccess(data: ILoginResponse) {
        this.showBadCredentials(false);
        this.loginForm.reset();
        // login successful so redirect to return url
        this.router.navigateByUrl(this.returnUrl);
    }

    public onFailed(error: HttpErrorResponse) {
        this.showBadCredentials(true);
        this.messageComponent.show('Error', this.translate.instant('ERROR'));
    }

    private showBadCredentials(show: boolean) {
        this._badCredentials = show;
    }
}
