import {Component, OnInit, ViewChild} from '@angular/core';
import {IContactsResponse} from '../service/contact/i-contacts-response';
import {LoadingComponent} from '../common/loading/loading.component';
import {MessageComponent} from '../common/message/message.component';
import {ContactService} from '../service/contact/contact.service';
import {TranslateService} from '../service/translate/translation.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {

    private _contactsResponse: IContactsResponse;

    private _isLoading: boolean;

    @ViewChild(LoadingComponent) private _loadingComponent: LoadingComponent;
    @ViewChild(MessageComponent) private _messageComponent: MessageComponent;

    constructor(private contactService: ContactService, private translate: TranslateService) {
        this._isLoading = false;
    }

    ngOnInit(): void {
        this.loadContacts();
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get contactsResponse(): IContactsResponse {
        return this._contactsResponse;
    }

    get loadingComponent(): LoadingComponent {
        return this._loadingComponent;
    }

    get messageComponent(): MessageComponent {
        return this._messageComponent;
    }

    set isLoading(value: boolean) {
        this._isLoading = value;
    }

    set contactsResponse(value: IContactsResponse) {
        this._contactsResponse = value;
    }

    public onRefreshBtnClick(): void {
        this.contactsResponse = null;
        this.loadContacts();
    }

    private loadContacts(): void {
        this.isLoading = true;
        this.loadingComponent.show(this.translate.instant('LOADING_MESSAGE'));
        // TODO please develop pagination
        this.contactService.getContacts<IContactsResponse>().subscribe(
            dataResponse => {
                this.isLoading = false;
                this.loadingComponent.hide();
                this.contactsResponse = dataResponse;
            },
            (err: HttpErrorResponse) => {
                this.isLoading = false;
                this.loadingComponent.hide();

                // TODO please develop log manager
                console.log('[ContactsComponent] Get Contacts an error occurred:');
                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.log(err.error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.log(err.error);
                }

                this.messageComponent.show('Error', this.translate.instant('ERROR'));
            }
        );
    }
}

