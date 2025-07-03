import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '../atoms/my-card';

@customElement('my-product-card')
export class MyProductCard extends LitElement {
  @property({ type: String }) name = '';
  @property({ type: String }) image = '';
  @property({ type: Number }) price = 0;

  static override styles = css`
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