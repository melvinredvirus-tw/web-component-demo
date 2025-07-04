import { LitElement } from 'lit';
export declare class MyTabs extends LitElement {
    static styles: import("lit").CSSResult;
    selected: number;
    _tabNodes: HTMLElement[];
    _panelNodes: HTMLElement[];
    private _onTabClick;
    private _onTabKeydown;
    private _focusTab;
    render(): import("lit-html").TemplateResult<1>;
    updated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-tabs': MyTabs;
    }
}
