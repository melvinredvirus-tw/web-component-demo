var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let MyButton = class MyButton extends LitElement {
    constructor() {
        super(...arguments);
        this.type = 'button';
        this.label = '';
        this.disabled = false;
    }
    render() {
        return html `
      <button
        type=${this.type}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <slot>${this.label}</slot>
      </button>
    `;
    }
};
MyButton.styles = css `
    button {
      background: var(--color-primary, #007bff);
      color: var(--color-bg, #fff);
      border: none;
      padding: var(--space-sm, 8px) var(--space-md, 16px);
      border-radius: var(--border-radius-sm, 4px);
      font-size: var(--font-size-base, 16px);
      cursor: pointer;
      font-family: var(--font-family-sans, 'Inter', sans-serif);
      transition: background var(--transition-fast, 0.15s ease-in-out);
    }
    button:hover {
      background: var(--color-accent, #ff5722);
    }
  `;
__decorate([
    property({ type: String })
], MyButton.prototype, "type", void 0);
__decorate([
    property({ type: String })
], MyButton.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], MyButton.prototype, "disabled", void 0);
MyButton = __decorate([
    customElement('my-button')
], MyButton);
export { MyButton };
