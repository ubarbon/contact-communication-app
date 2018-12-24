import {Component, AfterViewInit, Output, EventEmitter} from '@angular/core';

declare let $: any;

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html'
})

export class MessageComponent implements AfterViewInit {
    private readonly _id: string;
    private modalEl: any;
    private _title: string;
    private _message: string;

    @Output() eventClose: EventEmitter<any> = new EventEmitter();

    constructor() {
        this._id = uniqueId('modal_');
        this.modalEl = null;
    }

    get id(): string {
        return this._id;
    }

    get message(): string {
        return this._message;
    }

    get title(): string {
        return this._title;
    }

    ngAfterViewInit(): void {
        this.modalEl = $('#' + this._id);
        // can operate = true
    }

    show(title: string, message: string) {
        if (this.canOperate()) {
            this._title = title;
            this._message = message;
            this.modalEl.modal('show');
        }
    }

    hide() {
        if (this.canOperate()) {
            this.modalEl.modal('hide');
        }
    }

    closeInternal() {
        this.eventClose.next(null); // emit event
        this.hide();
    }

    canOperate(): boolean {
        return this.modalEl ? true : false;
    }
}

let modal_id = 0;

export function uniqueId(prefix: string): string {
    return prefix + ++modal_id;
}
