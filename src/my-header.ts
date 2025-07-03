import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-header')
export class MyHeader extends LitElement {
  static override styles = css`
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      background: linear-gradient(90deg, #4a90e2, #50e3c2);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }
    .title {
      font-size: 2rem;
      font-weight: 600;
      color: white;
    }
    .actions {
      display: flex;
      gap: 8px;
    }
  `;

  @property()
  heading = 'Header';

  override render() {
    return html`
      <header>
        <span class="title">${this.heading}</span>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-header': MyHeader;
  }
}
