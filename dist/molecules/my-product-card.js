var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '../atoms/my-card';
let MyProductCard = class MyProductCard extends LitElement {
    constructor() {
        super(...arguments);
        this.name = '';
        this.image = '';
        this.price = 0;
    }
    render() {
        return html `
      <my-card>
        <img class="image" src="${this.image}" alt="${this.name}" />
        <div class="name">${this.name}</div>
        <div class="price">$${this.price.toFixed(2)}</div>
        <slot name="link"></slot>
      </my-card>
    `;
    }
};
MyProductCard.styles = css `
    .name {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      margin: var(--space-sm) 0;
    }
    .description {
      font-size: var(--font-size-base);
      color: var(--color-muted);
      margin: var(--space-sm) 0;
    }
    .price {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
      color: var(--color-text, #333);
      margin: var(--space-sm) 0;
    }
    .image {
      width: 100%;
      height: auto;
      border-radius: var(--border-radius);
    }
    ::slotted([slot="link"]) {
      color: var(--color-primary);
      text-decoration: underline;
      cursor: pointer;
      display: inline-block;
      margin-top: var(--space-sm);
    }
  `;
__decorate([
    property({ type: String })
], MyProductCard.prototype, "name", void 0);
__decorate([
    property({ type: String })
], MyProductCard.prototype, "image", void 0);
__decorate([
    property({ type: Number })
], MyProductCard.prototype, "price", void 0);
MyProductCard = __decorate([
    customElement('my-product-card')
], MyProductCard);
export { MyProductCard };
