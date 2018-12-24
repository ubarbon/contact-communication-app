import {Injectable} from '@angular/core';
import {Authentication} from './authentication';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginEvent} from './login-event';
import {ILoginResponse} from './i-login-response';

const POST_LOGIN = '/oauth/v2/token';
const LOCAL_STORE_KEY = 'contact_com_session';

@Injectable()
export class AuthenticationService {
    private authentication: Authentication = null;

    constructor(private http: HttpClient) {
        this.loadLocalStore();
    }

    public isAuthenticated(): boolean {
        return !!this.getAuthentication();
    }


    public login(username: string, password: string, loginEvent: LoginEvent): void {
        const loginBody = {
            grant_type: 'password',
            client_id: environment.clientId,
            client_secret: environment.clientSecret,
            username: username,
            password: password
        };

        // Make the HTTP request:
        this.http.post<ILoginResponse>(environment.host + POST_LOGIN, loginBody).subscribe(accessData => {
                // Read the result field from the JSON response.
                this.setSuccessLogin(username, accessData);
                loginEvent.onSuccess(accessData);
            },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.error('An error occurred:', err.error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.error(err.error);
                }
                loginEvent.onFailed(err);
            });

    }

    public logout(): void {
        if (this.isAuthenticated() || localStorage.getItem(LOCAL_STORE_KEY)) {
            localStorage.removeItem(LOCAL_STORE_KEY);
            this.setAuthentication(null);
        }
    }

    public getAuthentication(): Authentication {
        return this.authentication;
    }

    public getLoginService(): string {
        return POST_LOGIN;
    }

    private setSuccessLogin(username: string, accessData: ILoginResponse): void {
        this.setAuthentication(new Authentication(username, accessData));
        this.saveLocalStore();
    }

    private setAuthentication(authentication: Authentication): void {
        this.authentication = authentication;
    }

    private loadLocalStore(): void {
        const data = localStorage.getItem(LOCAL_STORE_KEY);
        if (!data) {
            this.setAuthentication(null);
        } else {
            this.authentication = Authentication.fromLocalStore(data);
        }
    }

    private saveLocalStore(): void {
        localStorage.setItem(LOCAL_STORE_KEY, this.getAuthentication().toLocalStore());
    }
}
