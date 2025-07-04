import { LitElement } from 'lit';
export declare class MyButton extends LitElement {
    static styles: import("lit").CSSResult;
    type: 'button' | 'submit';
    label: string;
    disabled: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
