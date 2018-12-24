import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

const GET_COMMUNICATIONS = '/api/v1/contact/{contactId}/communications/page/{page}/total/{total}';

@Injectable()
export class CommunicationService {

    constructor(
        private http: HttpClient
    ) {
    }

    public getCommunications<T>(contactId: number, page: number = 1, total: number = 25): Observable<T> {
        const endpoint = GET_COMMUNICATIONS
            .replace('{contactId}', '' + contactId)
            .replace('{page}', '' + page)
            .replace('{total}', '' + total);

        return this.http.get<T>(environment.host + endpoint);
    }
}
