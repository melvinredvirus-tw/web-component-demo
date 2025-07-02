import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('my-accordion')
export class MyAccordion extends LitElement {
  @property({ type: Array }) items: { title: string; content: string }[] = [];

  static override styles = css`
   :host {
      display: block;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }
  `;

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-accordion': MyAccordion;
  }
}
