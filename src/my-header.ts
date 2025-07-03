import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-header')
export class MyHeader extends LitElement {
  static override styles = css`
    :host {
      /* Theming via global CSS variables from theme.css */
      --header-bg: var(--color-primary, #4a90e2);
      --header-title-color: var(--color-bg, #fff);
      --header-shadow: var(--shadow-md, 0 2px 8px rgba(0, 0, 0, 0.06));
      --header-padding: var(--space-md, 16px);
      --header-title-size: var(--font-size-2xl, 2rem);
      --header-title-weight: var(--font-weight-bold, 600);
      --header-actions-gap: var(--space-sm, 8px);
      --header-font-family: var(--font-family-sans, sans-serif);
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--header-padding);
      background: var(--header-bg);
      box-shadow: var(--header-shadow);
      font-family: var(--header-font-family);
    }
    .title {
      display: flex;
      gap: var(--header-actions-gap);
    }
    .actions {
      display: flex;
      gap: var(--header-actions-gap);
    }
  `;

  @property()
  heading = 'Header';

  override render() {
    return html`
      <header>
        <div class="title">
          <slot name="title">"></slot>
        </div>
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
