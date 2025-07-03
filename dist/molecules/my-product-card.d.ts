import { LitElement } from 'lit';
import '../atoms/my-card';
export declare class MyProductCard extends LitElement {
    name: string;
    id: string;
    image: string;
    price: number;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
