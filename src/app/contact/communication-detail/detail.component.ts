import {Component} from '@angular/core';
import {CALL_TYPE, ICommunication} from '../../service/model/i-communication';
import {IContact} from '../../service/model/i-contact';

declare let $: any;

@Component({
    selector: 'app-communication-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})

export class CommunicationDetailComponent {
    private _communication: ICommunication;
    private _contact: IContact;

    private readonly _id: string;

    constructor() {
        this._id = 'contact_detail_modal';
    }

    get id(): string {
        return this._id;
    }

    get communication(): ICommunication {
        return this._communication;
    }

    set communication(value: ICommunication) {
        this._communication = value;
    }

    get contact(): IContact {
        return this._contact;
    }

    set contact(value: IContact) {
        this._contact = value;
    }

    public isCallCommunication(): boolean {
        if (!this.communication) {
            return false;
        }

        return this.communication.type === CALL_TYPE;
    }

    public show(communication: ICommunication, contact: IContact): void {
        this.communication = communication;
        this.contact = contact;

        $('#' + this.id).modal('show');
    }
}
