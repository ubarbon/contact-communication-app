import {ConfirmMessageHandler} from './confirm-message-handler';

export interface ConfirmMessageEvent {
    onBtnOkClick(confirmMessageHandler: ConfirmMessageHandler): void;

    onBtnCancelClick(confirmMessageHandler: ConfirmMessageHandler): void;
}
