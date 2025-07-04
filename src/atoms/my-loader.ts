import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * Atomic Loader/loader component.
 * - Reusable: atomic, can be used anywhere
 * - Testable: stateless, exposes label for a11y
 * - Accessible: role="status", aria-label, respects reduced motion
 * - Performance: pure CSS animation, no unnecessary updates
 * - Responsive: size via CSS variable/media query
 * - Theming: all colors/sizes via CSS variables
 */
@customElement('my-loader')
export class MyLoader extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      --loader-size: 2rem;
      --loader-color: var(--color-primary, #007bff);
      --loader-border-width: 3px;
    }
    .Loader {
      display: inline-block;
      width: var(--loader-size);
      height: var(--loader-size);
      border: var(--loader-border-width) solid var(--loader-color);
      border-top: var(--loader-border-width) solid transparent;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      box-sizing: border-box;
    }
    @media (max-width: 600px) {
      :host {
        --loader-size: 1.5rem;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .Loader {
        animation: none;
      }
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  @property({type: String}) label = 'Loading...';
  @property({type: String}) size = ''; // e.g. "3rem"
  @property({type: String}) color = '';

  override updated() {
    if (this.size) {
      this.style.setProperty('--loader-size', this.size);
    }
    if (this.color) {
      this.style.setProperty('--loader-color', this.color);
    }
  }

  override render() {
    return html`
      <span
        class="Loader"
        role="status"
        aria-label=${this.label}
        aria-live="polite"
      ></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-loader': MyLoader;
  }
}
