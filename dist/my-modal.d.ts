import { LitElement } from 'lit';
export declare class MyModal extends LitElement {
    static styles: import("lit").CSSResult;
    open: boolean;
    size: string;
    private get _modalStyle();
    private _onBackdropClick;
    private _close;
    render(): import("lit-html").TemplateResult<1> | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-modal': MyModal;
    }
}
