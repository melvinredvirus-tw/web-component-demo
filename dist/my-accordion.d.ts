import { LitElement } from 'lit';
export declare class MyAccordion extends LitElement {
    items: {
        title: string;
        content: string;
    }[];
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-accordion': MyAccordion;
    }
}
