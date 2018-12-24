import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

const GET_CONTACTS = '/api/v1/contacts/page/{page}/total/{total}';

@Injectable()
export class ContactService {

    constructor(
        private http: HttpClient
    ) {
    }

    public getContacts<T>(page: number = 1, total: number = 25): Observable<T> {
        const endpoint = GET_CONTACTS.replace('{page}', '' + page).replace('{total}', '' + total);

        return this.http.get<T>(environment.host + endpoint);
    }
}
