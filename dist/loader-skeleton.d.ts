import { LitElement } from 'lit';
export declare class LoaderSkeleton extends LitElement {
    static styles: import("lit").CSSResult;
    shape: 'rect' | 'circle' | 'text';
    size: string;
    private get styleMap();
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'loader-skeleton': LoaderSkeleton;
    }
}
