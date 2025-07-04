import { LitElement } from 'lit';
export declare class MyInput extends LitElement {
    static styles: import("lit").CSSResult;
    value: string;
    name: string;
    type: 'text' | 'email' | 'number' | 'password';
    placeholder: string;
    disabled: boolean;
    ariaInvalid: string;
    autocomplete: string;
    private _onInput;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-input': MyInput;
    }
}
