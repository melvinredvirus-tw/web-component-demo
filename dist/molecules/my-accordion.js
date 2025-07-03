var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
let MyAccordion = class MyAccordion extends LitElement {
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
MyAccordion.styles = css `
    .item {
      border-bottom: var(--border-width) var(--border-style) var(--theme-border-color);
    }

    .header {
      background: var(--theme-accordion-header-bg);
      padding: var(--space-md);
      cursor: pointer;
      font-weight: var(--font-weight-bold);
      color: var(inherit);
    }

    .content {
      padding: var(--space-md);
      display: none;
      background: var(--theme-accordion-content-bg);
      color: var(--theme-accordion-content-color, inherit);
    }

    .content[open] {
      display: block;
    }
  `;
__decorate([
    property({ type: Boolean })
], MyAccordion.prototype, "open", void 0);
__decorate([
    property({ type: String })
], MyAccordion.prototype, "title", void 0);
MyAccordion = __decorate([
    customElement('my-accordion')
], MyAccordion);
export { MyAccordion };
