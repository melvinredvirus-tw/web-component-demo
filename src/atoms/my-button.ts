import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-button')
export class MyButton extends LitElement {
  static override styles = css`
    button {
      background: var(--color-primary, #007bff);
      color: var(--color-bg, #fff);
      border: none;
      padding: var(--space-sm, 8px) var(--space-md, 16px);
      border-radius: var(--border-radius-sm, 4px);
      font-size: var(--font-size-base, 16px);
      cursor: pointer;
      font-family: var(--font-family-sans, 'Inter', sans-serif);
      transition: background var(--transition-fast, 0.15s ease-in-out);
    }
    button:hover {
      background: var(--color-accent, #ff5722);
    }
  `;
  @property({type: String}) type: 'button' | 'submit' = 'button';
  @property({type: String}) label = '';
  @property({type: Boolean}) disabled = false;

  override render() {
    return html`
      <button
        type=${this.type}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <slot>${this.label}</slot>
      </button>
    `;
  }
}
