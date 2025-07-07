import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-checkbox')
export class MyCheckbox extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      --checkbox-size: var(--font-size-xl, 24px);
      --checkbox-border-color: var(--border-color, #dee2e6);
      --checkbox-border-color-checked: var(--color-primary, #007bff);
      --checkbox-bg: var(--color-bg, #fff);
      --checkbox-bg-checked: var(--color-primary, #007bff);
      --checkbox-focus-ring: 2px solid var(--color-primary, #007bff);
      --checkbox-label-color: var(--color-text, #212529);
      --checkbox-label-font-size: var(--font-size-base, 16px);
      --checkbox-spacing: var(--space-sm, 8px);
      font-family: var(--font-family-sans, 'Inter', sans-serif);
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: var(--checkbox-spacing);
    }

    input[type='checkbox'] {
      appearance: none;
      width: var(--checkbox-size);
      height: var(--checkbox-size);
      border: 2px solid var(--checkbox-border-color);
      border-radius: var(--border-radius-sm, 4px);
      background: var(--checkbox-bg);
      cursor: pointer;
      transition: background var(--transition-fast, 0.15s ease-in-out), border-color var(--transition-fast, 0.15s ease-in-out);
      display: inline-block;
      vertical-align: middle;
    }

    input[type='checkbox']:checked {
      background: var(--checkbox-bg-checked);
      border-color: var(--checkbox-border-color-checked);
    }

    input[type='checkbox']:focus {
      outline: var(--checkbox-focus-ring);
      outline-offset: 2px;
    }

    input[type='checkbox']:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    label {
      color: var(--checkbox-label-color);
      font-size: var(--checkbox-label-font-size);
      cursor: pointer;
      user-select: none;
      font-family: inherit;
    }

    label[aria-disabled='true'] {
      cursor: not-allowed;
    }
  `;

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) label = '';

  private _onChange(e: Event) {
    if (this.disabled) return;
    this.checked = (e.target as HTMLInputElement).checked;
    this.dispatchEvent(new CustomEvent('change', { detail: { checked: this.checked } }));
  }

  override render() {
    return html`
      <div class="checkbox-wrapper">
        <input
          type="checkbox"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._onChange}
          aria-checked=${this.checked}
          aria-disabled=${this.disabled}
          id="checkbox-input"
        />
        <label aria-disabled=${this.disabled} for="checkbox-input">${this.label}</label>
      </div>
    `;
  }
}