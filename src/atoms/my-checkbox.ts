import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-checkbox')
export class MyCheckbox extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      --checkbox-size: 20px;
      --checkbox-border-color: #ccc;
      --checkbox-border-color-checked: #007bff;
      --checkbox-bg: #fff;
      --checkbox-bg-checked: #007bff;
      --checkbox-focus-ring: 2px solid #007bff;
      --checkbox-label-color: #212529;
      --checkbox-label-font-size: 16px;
      --checkbox-spacing: 8px;
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
      border-radius: 4px;
      background: var(--checkbox-bg);
      cursor: pointer;
      transition: background 0.2s ease, border-color 0.2s ease;
    }

    input[type='checkbox']:checked {
      background: var(--checkbox-bg-checked);
      border-color: var(--checkbox-border-color-checked);
    }

    input[type='checkbox']:focus {
      outline: var(--checkbox-focus-ring);
    }

    input[type='checkbox']:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    label {
      color: var(--checkbox-label-color);
      font-size: var(--checkbox-label-font-size);
      cursor: pointer;
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
        />
        <label aria-disabled=${this.disabled}>${this.label}</label>
      </div>
    `;
  }
}