import { LitElement } from 'lit';
export declare class MyForm extends LitElement {
    static styles: import("lit").CSSResult;
    onSubmit?: (data: Record<string, string>, event: Event) => void;
    private _onSubmit;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-form': MyForm;
    }
}
