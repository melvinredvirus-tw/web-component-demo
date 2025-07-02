import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('my-card')
export class MyCard extends LitElement {
  @property({ type: String }) name = '';
  @property({ type: String }) image = '';
  @property({ type: String }) description = '';
  @property({ type: Number }) price = 0;

  static override styles = css`
    :host {
      display: block;
      border: 1px solid #ccc;
      border-radius: 8px; 
      padding: 16px;
      max-width: 300px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
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
      <div class="card">
        <img class="image" src="${this.image}" alt="${this.name}" />
        <div class="name">${this.name}</div>
        <div class="description">${this.description}</div>
        <div class="price">$${this.price.toFixed(2)}</div>
      </div>
    `;
  }
}