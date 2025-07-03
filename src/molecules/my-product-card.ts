import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '../atoms/my-card';

@customElement('my-product-card')
export class MyProductCard extends LitElement {
  @property({ type: String }) name = '';
  @property({ type: String }) image = '';
  @property({ type: Number }) price = 0;

  static override styles = css`
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

  override render() {
    return html`
      <my-card>
        <img class="image" src="${this.image}" alt="${this.name}" />
        <div class="name">${this.name}</div>
        <div class="price">$${this.price.toFixed(2)}</div>
        <slot name="link"></slot>
      </my-card>
    `;
  }
}