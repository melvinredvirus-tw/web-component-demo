import { LitElement } from 'lit';
export declare class MyAccordion extends LitElement {
    open: boolean;
    title: string;
    static styles: import("lit").CSSResult;
    toggle(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'accordion-item': MyAccordion;
    }
}
