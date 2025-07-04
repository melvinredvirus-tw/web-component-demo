import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-input')
export class MyInput extends LitElement {
  static override styles = css`
    input {
      width: 100%;
      padding: var(--space-sm, 8px);
      font-size: var(--font-size-base, 16px);
      border: var(--border-width, 1px) var(--border-style, solid)
        var(--border-color, #dee2e6);
      border-radius: var(--border-radius-sm, 4px);
      background: var(--color-bg, #fff);
      color: var(--color-text, #212529);
      font-family: var(--font-family-sans, 'Inter', sans-serif);
      transition: border-color var(--transition-fast, 0.15s ease-in-out);
      box-sizing: border-box;
    }
    input:focus {
      outline: none;
      border-color: var(--color-primary, #007bff);
    }
    input[aria-invalid='true'] {
      border-color: var(--color-error, #dc3545);
    }
  `;

  @property({type: String}) value = '';
  @property({type: String}) name = '';
  @property({type: String}) type: 'text' | 'email' | 'number' | 'password' =
    'text';
  @property({type: String}) placeholder = '';
  @property({type: Boolean, reflect: true}) disabled = false;
  @property({type: String, reflect: true, attribute: 'aria-invalid'})
  override ariaInvalid = '';
  @property({type: String}) autocomplete = '';

  private _onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <input
        .value=${this.value}
        name=${this.name}
        type=${this.type}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        aria-invalid=${this.ariaInvalid || undefined}
        autocomplete=${this.autocomplete}
        @input=${this._onInput}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-input': MyInput;
  }
}
