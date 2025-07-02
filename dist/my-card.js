var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
let MyCard = class MyCard extends LitElement {
    constructor() {
        super(...arguments);
        this.name = '';
        this.image = '';
        this.description = '';
        this.price = 0;
    }
    render() {
        return html `
      <div class="card">
        <img class="image" src="${this.image}" alt="${this.name}" />
        <div class="name">${this.name}</div>
        <div class="description">${this.description}</div>
        <div class="price">$${this.price.toFixed(2)}</div>
      </div>
    `;
    }
};
MyCard.styles = css `
    :host {
      display: block;
      border: 1px solid #ccc;
      border-radius: 8px; 
      padding: 16px;
      max-width: 300px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .image {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
    .name {
      font-size: 1.5em;
      font-weight: bold;
      margin: 8px 0;
    }
    .description {
      font-size: 1em;
      color: #555;
      margin: 8px 0;
    }
    .price {
      font-size: 1.2em;
      font-weight: bold;
      color: #333;
      margin: 8px 0;
    }
  `;
__decorate([
    property({ type: String })
], MyCard.prototype, "name", void 0);
__decorate([
    property({ type: String })
], MyCard.prototype, "image", void 0);
__decorate([
    property({ type: String })
], MyCard.prototype, "description", void 0);
__decorate([
    property({ type: Number })
], MyCard.prototype, "price", void 0);
MyCard = __decorate([
    customElement('my-card')
], MyCard);
export { MyCard };
//# sourceMappingURL=my-card.js.map