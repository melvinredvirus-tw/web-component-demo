var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
let AccordionItem = class AccordionItem extends LitElement {
    constructor() {
        super(...arguments);
        this.open = false;
        this.title = '';
    }
    toggle() {
        this.open = !this.open;
    }
    render() {
        return html `
    <div class="item">
      <div class="header" @click="${this.toggle}">${this.title}</div>
      <div class="content" ?open="${this.open}">
        <slot></slot>
      </div>
    </div>
  `;
    }
};
AccordionItem.styles = css `
    .item {
      border-bottom: 1px solid #ccc;
    }

    .header {
      background: #f5f5f5;
      padding: 1rem;
      cursor: pointer;
      font-weight: bold;
    }

    .content {
      padding: 1rem;
      display: none;
      background: #fff;
    }

    .content[open] {
      display: block;
    }
  `;
__decorate([
    property({ type: Boolean })
], AccordionItem.prototype, "open", void 0);
__decorate([
    property({ type: String })
], AccordionItem.prototype, "title", void 0);
AccordionItem = __decorate([
    customElement('accordion-item')
], AccordionItem);
export { AccordionItem };
