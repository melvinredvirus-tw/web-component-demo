import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-header')
export class MyHeader extends LitElement {
  static override styles = css`
    header {
      display: block;
      background: #1976d2;
      color: white;
      padding: 16px;
      font-size: 1.5rem;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
      letter-spacing: 1px;
    }
  `;

  @property()
  name = 'Header';

  override render() {
    return html`
      <header class="header">
        <h1>${this.name}</h1>
        <h1>Cart</h1>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-header': MyHeader;
  }
}
