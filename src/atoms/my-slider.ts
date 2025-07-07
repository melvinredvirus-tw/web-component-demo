import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('my-slider')
export class MySlider extends LitElement {
  static override styles = css`
    :host {
      display: block;
      max-width: 600px;
      --slider-thumb-color: #007bff;
      --slider-label-color: #333;
    }

    .slider-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: var(--space-md);
    }

    label {
      font-weight: 600;
      font-size: 1rem;
      color: var(--slider-label-color);
    }

    .slider-wrapper {
      position: relative;
      width: 100%;
    }

    input[type="range"] {
      width: 100%;
      margin: 0;
      accent-color: var(--slider-thumb-color);
    }

    .value-labels {
      display: flex;
      justify-content: space-between;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      padding: 0.5rem;
      font-size: 0.875rem;
      color: var(--slider-label-color);
      pointer-events: none;
    }

    .selected {
      font-weight: bold;
    }

    .selected-value {
      font-weight: 500;
    }

    @media (max-width: 600px) {
      .value-labels {
        font-size: 0.75rem;
      }
    }
  `;

  @property({ type: Array }) values: number[] = [];

  @property({ type: String }) label = 'Select Value';

  @state() private currentIndex = 0;

  private onInputChange(e: Event) {
    this.currentIndex = parseInt((e.target as HTMLInputElement).value, 10);
    const selectedValue = this.values[this.currentIndex];
    this.dispatchEvent(
      new CustomEvent('value-change', {
        detail: selectedValue,
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    if (!this.values || this.values.length === 0) {
      return html`<div>No values provided.</div>`;
    }

    const currentValue = this.values[this.currentIndex];

    return html`
      <div class="slider-container">
        <label for="slider" id="sliderLabel">${this.label}: ${currentValue}</label>

        <div class="slider-wrapper">
          <input
            id="slider"
            type="range"
            min="0"
            max="${this.values.length - 1}"
            .value="${String(this.currentIndex)}"
            @input="${this.onInputChange}"
            aria-valuemin="${this.values[0]}"
            aria-valuemax="${this.values[this.values.length - 1]}"
            aria-valuenow="${currentValue}"
            aria-label="${this.label}"
          />

          <!-- Tick Labels -->
          <div class="value-labels" aria-hidden="true">
            ${this.values.map(
              (val, i) => html`
                <span class="${this.currentIndex === i ? 'selected' : ''}">
                  ${val}
                </span>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}
