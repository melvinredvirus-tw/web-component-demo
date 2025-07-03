import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-card')
export class MyCard extends LitElement {
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
  `;

  override render() {
    return html`
      <div class="card">
        <slot></slot>
        <slot name="link"></slot>
      </div>
    `;
  }
}