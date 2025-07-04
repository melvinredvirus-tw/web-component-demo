import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

@customElement('my-dropdown')
export class MyDropdown extends LitElement {
  @property({type: Array}) options: Array<{value: string; label: string}> = [];
  @property({type: String}) selected = '';
  @property({type: String}) placeholder = 'Select an option';
  @property({type: Boolean}) disabled = false;

  @state() private _isOpen = false;

  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--font-family-sans, 'Inter', sans-serif);
    }
    .dropdown {
      position: relative;
      width: 100%;
      max-width: 300px;
    }
    .dropdown-button {
      width: 100%;
      padding: var(--space-sm, 8px);
      font-size: var(--font-size-base, 16px);
      border: var(--border-width, 1px) var(--border-style, solid)
        var(--border-color, #dee2e6);
      border-radius: var(--border-radius-sm, 4px);
      background: var(--color-bg, #fff);
      color: var(--color-text, #212529);
      cursor: pointer;
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: border-color var(--transition-fast, 0.15s ease-in-out);
    }
    .dropdown-button:disabled {
      background: var(--color-bg-disabled, #f8f9fa);
      color: var(--color-text-disabled, #adb5bd);
      cursor: not-allowed;
    }
    .dropdown-button:focus {
      outline: none;
      border-color: var(--color-primary, #007bff);
    }
    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background: var(--color-bg, #fff);
      border: var(--border-width, 1px) var(--border-style, solid)
        var(--border-color, #dee2e6);
      border-radius: var(--border-radius-sm, 4px);
      box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));
      z-index: 1000;
      max-height: 200px;
      overflow-y: auto;
    }
    .dropdown-item {
      padding: var(--space-sm, 8px);
      font-size: var(--font-size-base, 16px);
      color: var(--color-text, #212529);
      cursor: pointer;
      transition: background var(--transition-fast, 0.15s ease-in-out);
    }
    .dropdown-item:hover {
      background: var(--color-bg-hover, #f1f3f5);
    }
    .dropdown-item[aria-selected='true'] {
      background: var(--color-primary-light, #e7f1ff);
      font-weight: var(--font-weight-bold, 700);
    }
    .dropdown-item[aria-disabled='true'] {
      color: var(--color-text-disabled, #adb5bd);
      cursor: not-allowed;
    }
  `;

  private _toggleDropdown() {
    if (!this.disabled) {
      this._isOpen = !this._isOpen;
    }
  }

  private _selectOption(value: string) {
    this.selected = value;
    this._isOpen = false;
    this.dispatchEvent(new CustomEvent('change', {detail: {value}}));
  }

  override render() {
    console.log(this.options);
    return html`
      <div class="dropdown">
        <button
          class="dropdown-button"
          @click=${this._toggleDropdown}
          ?disabled=${this.disabled}
          aria-haspopup="listbox"
          aria-expanded=${this._isOpen}
        >
          <span>${this.selected || this.placeholder}</span>
          <span>&#9662;</span>
        </button>
        ${this._isOpen
          ? html`
              <ul class="dropdown-menu" role="listbox">
                ${this.options.map(
                  (option) => html`
                    <li
                      class="dropdown-item"
                      role="option"
                      aria-selected=${this.selected === option.value}
                      @click=${() => this._selectOption(option.value)}
                    >
                      ${option.label}
                    </li>
                  `
                )}
              </ul>
            `
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-dropdown': MyDropdown;
  }
}
