var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
let MyHeader = class MyHeader extends LitElement {
    render() {
        return html `
      <header>
        <div class="title">
          <slot name="title">"></slot>
        </div>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </header>
    `;
    }
};
MyHeader.styles = css `
    :host {
      /* Theming via global CSS variables from theme.css */
      --header-bg: var(--color-primary, #4a90e2);
      --header-title-color: var(--color-bg, #fff);
      --header-shadow: var(--shadow-md, 0 2px 8px rgba(0, 0, 0, 0.06));
      --header-padding: var(--space-md, 16px);
      --header-title-size: var(--font-size-2xl, 2rem);
      --header-title-weight: var(--font-weight-bold, 600);
      --header-actions-gap: var(--space-sm, 8px);
      --header-font-family: var(--font-family-sans, sans-serif);
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--header-padding);
      background: var(--header-bg);
      box-shadow: var(--header-shadow);
      font-family: var(--header-font-family);
    }
    .title {
      display: flex;
      gap: var(--header-actions-gap);
    }
    .actions {
      display: flex;
      gap: var(--header-actions-gap);
    }
  `;
MyHeader = __decorate([
    customElement('my-header')
], MyHeader);
export { MyHeader };
