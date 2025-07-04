import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-date-picker')
export class MyDatePicker extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--font-family-sans, 'Inter', sans-serif);
    }
    .wrapper {
      position: relative;
      width: 100%;
      max-width: 260px;
    }
    input[type='date'] {
      width: 100%;
      padding: var(--space-sm, 8px);
      font-size: var(--font-size-base, 16px);
      border: var(--border-width, 1px) var(--border-style, solid)
        var(--border-color, #dee2e6);
      border-radius: var(--border-radius-sm, 4px);
      background: var(--color-bg, #fff);
      color: var(--color-text, #212529);
      transition: border-color var(--transition-fast, 0.15s ease-in-out);
      box-sizing: border-box;
    }
    input[type='date']:focus {
      outline: none;
      border-color: var(--color-primary, #007bff);
    }
    input[type='date'][aria-invalid='true'] {
      border-color: var(--color-error, #dc3545);
    }
    .icon {
      position: absolute;
      right: var(--space-sm, 8px);
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: var(--color-muted, #6c757d);
    }
    @media (max-width: 480px) {
      .wrapper {
        max-width: 100%;
      }
      input[type='date'] {
        font-size: var(--font-size-sm, 14px);
      }
    }
  `;

  @property({type: String}) value = '';
  @property({type: String}) name = '';
  @property({type: String}) min = '';
  @property({type: String}) max = '';
  @property({type: Boolean, reflect: true}) disabled = false;
  @property({type: String}) placeholder = '';
  @property({type: String}) label = '';
  @property({type: Boolean}) required = false;
  @property({type: String, reflect: true, attribute: 'aria-invalid'})
  override ariaInvalid = '';

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

  private _onFocus() {}

  private _onBlur() {}

  override render() {
    return html`
      <div class="wrapper">
        ${this.label
          ? html`<label for="date-input"
              >${this.label}${this.required
                ? html`<span
                    aria-hidden="true"
                    style="color:var(--color-error,#dc3545)"
                    >*</span
                  >`
                : ''}</label
            >`
          : null}
        <input
          id="date-input"
          type="date"
          .value=${this.value}
          name=${this.name}
          min=${this.min}
          max=${this.max}
          ?disabled=${this.disabled}
          placeholder=${this.placeholder}
          aria-invalid=${this.ariaInvalid || undefined}
          ?required=${this.required}
          @input=${this._onInput}
          @focus=${this._onFocus}
          @blur=${this._onBlur}
        />
        <span class="icon" aria-hidden="true">
          <!-- Simple calendar SVG icon -->
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <rect
              x="3"
              y="5"
              width="18"
              height="16"
              rx="2"
              fill="currentColor"
              opacity="0.1"
            />
            <rect
              x="3"
              y="5"
              width="18"
              height="16"
              rx="2"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M16 3v4M8 3v4"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <rect
              x="7"
              y="13"
              width="2"
              height="2"
              rx="1"
              fill="currentColor"
            />
            <rect
              x="11"
              y="13"
              width="2"
              height="2"
              rx="1"
              fill="currentColor"
            />
            <rect
              x="15"
              y="13"
              width="2"
              height="2"
              rx="1"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-date-picker': MyDatePicker;
  }
}
