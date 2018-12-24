import {Component, OnInit, ViewChild} from '@angular/core';
import {IContactsResponse} from '../service/contact/i-contacts-response';
import {LoadingComponent} from '../common/loading/loading.component';
import {MessageComponent} from '../common/message/message.component';
import {ContactService} from '../service/contact/contact.service';
import {TranslateService} from '../service/translate/translation.service';
import {HttpErrorResponse} from '@angular/common/http';
import {IContactView} from './i-contact-view';
import {CALL_TYPE, ICommunication} from '../service/model/i-communication';
import {CommunicationService} from '../service/communication/communication.service';
import {ICommunicationResponse} from '../service/communication/i-communication-response';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {

    private _contacts: IContactView[];

    private _isLoading: boolean;

    @ViewChild(LoadingComponent) private _loadingComponent: LoadingComponent;
    @ViewChild(MessageComponent) private _messageComponent: MessageComponent;

    constructor(private contactService: ContactService, private communicationService: CommunicationService, private translate: TranslateService) {
        this._contacts = [];
        this._isLoading = false;
    }

    ngOnInit(): void {
        this.loadContacts();
    }

    get contacts(): IContactView[] {
        return this._contacts;
    }

    get isLoading(): boolean {
        return this._isLoading;
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

    set contacts(value: IContactView[]) {
        this._contacts = value;
    }

    public onRefreshBtnClick(): void {
        this.loadContacts();
    }

    public onContactViewClick(contactView: IContactView): void {
        if (contactView.isLoaded) {
            return;
        }

        this.loadCommunicationsContact(contactView);
    }

    public onCommunicationClick(communication: ICommunication): void {
        /*if (approvePromotion.isLoaded) {
            return;
        }
        this.loadApprovePromotion(approvePromotion);*/
        console.log(communication);
    }

    public isCallCommunication(communication: ICommunication): boolean {
        return communication.type === CALL_TYPE;
    }

    private loadContacts(): void {
        this.isLoading = true;
        this.contacts = [];
        this.loadingComponent.show(this.translate.instant('LOADING_MESSAGE'));
        // TODO please develop pagination
        this.contactService.getContacts<IContactsResponse>().subscribe(
            dataResponse => {
                this.isLoading = false;
                this.loadingComponent.hide();
                this.setContacts(dataResponse);
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

    private setContacts(contactsResponse: IContactsResponse): void {
        for (let i = 0; i < contactsResponse.contacts.length; i++) {
            this.contacts.push({
                contact: contactsResponse.contacts[i],
                isLoaded: false,
                communications: []
            });
        }
    }

    private loadCommunicationsContact(contactView: IContactView): void {
        // TODO please develop pagination
        this.communicationService.getCommunications<ICommunicationResponse>(contactView.contact.id).subscribe(
            dataResponse => {
                this.setCommunicationsToContact(contactView, dataResponse);
            },
            (err: HttpErrorResponse) => {
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

    private setCommunicationsToContact(contactView: IContactView, communicationResponse: ICommunicationResponse): void {
        contactView.communications = communicationResponse.communications;
        contactView.isLoaded = true;
    }
}

