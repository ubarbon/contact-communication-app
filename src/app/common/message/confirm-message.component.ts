import {Component, AfterViewInit, Output, EventEmitter, Input} from '@angular/core';
import {ConfirmMessageHandler} from './confirm-message-handler';

declare let $: any;

@Component({
    selector: 'app-confirm-message',
    templateUrl: './confirm-message.component.html'
})

export class ConfirmMessageComponent implements AfterViewInit {

    private readonly id: string;
    private modalEl: any;

    @Input() handler: ConfirmMessageHandler;

    @Output() eventClose: EventEmitter<any> = new EventEmitter();

    constructor() {
        this.id = uniqueId('confirm_modal_');
    }

    ngAfterViewInit(): void {
        this.modalEl = $('#' + this.getId());
        // can operate = true
    }

    show() {
        if (this.canOperate()) {
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

    getHandler(): ConfirmMessageHandler {
        return this.handler;
    }

    getId(): string {
        return this.id;
    }

    canOperate(): boolean {
        return this.modalEl && this.getHandler() ? true : false;
    }
}

let modal_id = 0;

export function uniqueId(prefix: string): string {
    return prefix + ++modal_id;
}
