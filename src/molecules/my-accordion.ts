import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('my-accordion')
export class MyAccordion extends LitElement {
  @property({ type: Boolean }) open = false;
  @property({ type: String }) override title = '';

  static override styles = css`
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

  toggle() {
    this.open = !this.open;
  }

  override render() {
    return html`
    <div class="item">
      <div class="header" @click="${this.toggle}">${this.title}</div>
      <div class="content" ?open="${this.open}">
        <slot></slot>
      </div>
    </div>
  `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'accordion-item': MyAccordion;
  }
}
