import {HttpErrorResponse} from '@angular/common/http';
import {ILoginResponse} from './i-login-response';

export interface LoginEvent {
    onSuccess(data: ILoginResponse): void;

    onFailed(error: HttpErrorResponse): void;
}
