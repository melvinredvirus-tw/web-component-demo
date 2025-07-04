var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let MyInput = class MyInput extends LitElement {
    constructor() {
        super(...arguments);
        this.value = '';
        this.name = '';
        this.type = 'text';
        this.placeholder = '';
        this.disabled = false;
        this.ariaInvalid = '';
        this.autocomplete = '';
    }
    _onInput(e) {
        const target = e.target;
        this.value = target.value;
        this.dispatchEvent(new CustomEvent('input', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return html `
      <input
        .value=${this.value}
        name=${this.name}
        type=${this.type}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        aria-invalid=${this.ariaInvalid || undefined}
        autocomplete=${this.autocomplete}
        @input=${this._onInput}
      />
    `;
    }
};
MyInput.styles = css `
    input {
      width: 100%;
      padding: var(--space-sm, 8px);
      font-size: var(--font-size-base, 16px);
      border: var(--border-width, 1px) var(--border-style, solid)
        var(--border-color, #dee2e6);
      border-radius: var(--border-radius-sm, 4px);
      background: var(--color-bg, #fff);
      color: var(--color-text, #212529);
      font-family: var(--font-family-sans, 'Inter', sans-serif);
      transition: border-color var(--transition-fast, 0.15s ease-in-out);
      box-sizing: border-box;
    }
    input:focus {
      outline: none;
      border-color: var(--color-primary, #007bff);
    }
    input[aria-invalid='true'] {
      border-color: var(--color-error, #dc3545);
    }
  `;
__decorate([
    property({ type: String })
], MyInput.prototype, "value", void 0);
__decorate([
    property({ type: String })
], MyInput.prototype, "name", void 0);
__decorate([
    property({ type: String })
], MyInput.prototype, "type", void 0);
__decorate([
    property({ type: String })
], MyInput.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MyInput.prototype, "disabled", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'aria-invalid' })
], MyInput.prototype, "ariaInvalid", void 0);
__decorate([
    property({ type: String })
], MyInput.prototype, "autocomplete", void 0);
MyInput = __decorate([
    customElement('my-input')
], MyInput);
export { MyInput };
