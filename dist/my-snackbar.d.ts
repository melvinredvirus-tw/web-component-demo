import { LitElement } from 'lit';
export declare class MySnackbar extends LitElement {
    message: string;
    visible: boolean;
    static styles: import("lit").CSSResult;
    show(message: string): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-snackbar': MySnackbar;
    }
}
