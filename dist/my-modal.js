var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let MyModal = class MyModal extends LitElement {
    constructor() {
        super(...arguments);
        this.open = false;
        this.size = '400x200'; // width x height
    }
    get _modalStyle() {
        const [width, height] = this.size.split('x');
        return `width:${width}px;height:${height}px;`;
    }
    _onBackdropClick(e) {
        if (e.target === e.currentTarget)
            this._close();
    }
    _close() {
        this.open = false;
        this.dispatchEvent(new CustomEvent('close'));
    }
    render() {
        if (!this.open)
            return null;
        return html `
      <div class="backdrop" @click=${this._onBackdropClick}>
        <div class="modal" style=${this._modalStyle}>
          <button class="close" @click=${this._close}>&times;</button>
          <slot></slot>
        </div>
      </div>
    `;
    }
};
MyModal.styles = css `
    :host {
      display: block;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: var(--z-index-modal, 1040);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal {
      background: var(--color-bg, #f9fafc);
      border-radius: var(--border-radius, 8px);
      border: var(--border-width, 2px) var(--border-style, solid)
        var(--border-color, #e2e8f0);
      box-shadow: var(--shadow-lg, 0 2px 16px rgba(0, 0, 0, 0.2));
      padding: var(--space-lg, 24px);
      position: relative;
      z-index: calc(var(--z-index-modal, 1040) + 1);
      display: flex;
      flex-direction: column;
      min-width: 200px;
      min-height: 100px;
      font-family: var(--font-family-sans, 'Inter', sans-serif);
    }

    .close {
      position: absolute;
      top: var(--space-sm, 8px);
      right: var(--space-md, 16px);
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--color-text, #212529);
      transition: color var(--transition-fast, 0.15s ease-in-out);
    }
    .close:hover {
      color: var(--color-accent, #ff5722);
    }
  `;
__decorate([
    property({ type: Boolean, reflect: true })
], MyModal.prototype, "open", void 0);
__decorate([
    property({ type: String })
], MyModal.prototype, "size", void 0);
MyModal = __decorate([
    customElement('my-modal')
], MyModal);
export { MyModal };
