import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('my-accordion')
export class MyAccordion extends LitElement {
  @property({ type: Boolean }) open = false;
  @property({ type: String }) override title = '';

  static override styles = css`
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
