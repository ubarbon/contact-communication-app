import {Injectable, Injector} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {AuthenticationService} from './service/authentication/authentication.service';
import {Observable} from 'rxjs';


@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(private injector: Injector, private router: Router) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authenticationService = this.injector.get(AuthenticationService);

        if (request.url.indexOf(authenticationService.getLoginService()) !== -1 && !authenticationService.isAuthenticated()) {
            this.router.navigate(['login']);
        }

        if (authenticationService.isAuthenticated() && request.url.indexOf(authenticationService.getLoginService()) === -1) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${authenticationService.getAuthentication().getToken()}`
                }
            });
        }

        return next.handle(request).do(event => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {

                if (err.status === 401) {
                    // redirect to the login route
                    // or show a modal
                    this.router.navigate(['login']);
                }
            }
        });
    }
}
