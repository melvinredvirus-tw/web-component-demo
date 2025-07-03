import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-card')
export class MyCard extends LitElement {
  static override styles = css`
    :host {
      display: block;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius); 
      padding: var(--space-md);
      max-width: var(--card-max-width, 300px);
      box-shadow: var(--shadow-md);
      background: var(--color-surface);
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