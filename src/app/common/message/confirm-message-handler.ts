import {ConfirmMessageEvent} from './confirm-message-event';

export class ConfirmMessageHandler {
    private title: string;
    private message: string;
    private textBtnOk: string;
    private textBtnCancel: string;
    private event: ConfirmMessageEvent;
    private operationOnServer: boolean;

    constructor(title: string, message: string, textBtnOk: string, textBtnCancel: string, event: ConfirmMessageEvent) {
        this.title = title;
        this.message = message;
        this.textBtnOk = textBtnOk;
        this.textBtnCancel = textBtnCancel;
        this.event = event;
        this.operationOnServer = false;
    }

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    getMessage(): string {
        return this.message;
    }

    getTextBtnOk(): string {
        return this.textBtnOk;
    }

    getTextBtnCancel(): string {
        return this.textBtnCancel;
    }

    doingOperationOnServer(): boolean {
        return this.operationOnServer;
    }

    setOperationOnServer(status: boolean): void {
        this.operationOnServer = status;
    }

    onBtnOkClick() {
        this.event.onBtnOkClick(this);
    }

    onBtnCancelClick() {
        this.event.onBtnCancelClick(this);
    }

    private getEvent(): ConfirmMessageEvent {
        return this.event;
    }
}
