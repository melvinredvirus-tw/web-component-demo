import { LitElement, html, css, svg, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { iconRegistry } from './icons-registry';

@customElement('my-icon')
export class MyIcon extends LitElement {
  /**
   * THEMING:
   * Styles are defined using CSS Custom Properties with sensible fallbacks.
   * This allows consumers to easily theme the component from the outside.
   * Using `currentColor` as the default makes the icon inherit its parent's
   * text color, which is great for responsiveness and theming.
   */
  static override styles: CSSResultGroup = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--icon-size, 1em);
      height: var(--icon-size, 1em);
      
      /* Default theme values */
      --icon-color: currentColor;
      --icon-stroke-width: 2px;
    }

    svg {
      width: 100%;
      height: 100%;
      stroke: var(--icon-color);
      stroke-width: var(--icon-stroke-width);
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
    }
  `;

  /**
   * The name of the icon to display from the icon registry.
   */
  @property({ type: String })
  name?: string;

  /**
   * The size of the icon (CSS size, e.g. "24px", "2em").
   * Defaults to 1em for font-like scaling.
   */
  @property({ type: String })
  size = '';

  /**
   * The color of the icon (CSS color value).
   * Defaults to currentColor for theming.
   */
  @property({ type: String })
  color = '';
  
  /**
   * ACCESSIBILITY:
   * An optional label for the icon. If provided, the icon is considered
   * meaningful and will have `role="img"` and an `aria-label`.
   * If omitted, the icon is considered decorative and will be hidden
   * from screen readers with `aria-hidden="true"`.
   */
  @property({ type: String })
  label?: string;

  /**
   * ACCESSIBILITY & TESTABILITY:
   * Lit's `hostAttributes` provides a clean, declarative way to set ARIA
   * attributes on the host element itself. This is easy to test: given a `label`,
   * does the host have the `role="img"` attribute?
   */
  get hostAttributes() {
    return this.label
      ? { role: 'img', 'aria-label': this.label }
      : { 'aria-hidden': 'true' };
  }

  override render(): TemplateResult {
    if (!this.name) {
      return html``;
    }

    const iconPath = iconRegistry.get(this.name);

    if (!iconPath) {
      console.warn(`Icon "${this.name}" not found in registry.`);
      return html``; // Render nothing if the icon doesn't exist
    }

    // Inline style for size and color overrides
    const styleParts = [];
    if (this.size) styleParts.push(`--icon-size: ${this.size}`);
    if (this.color) styleParts.push(`--icon-color: ${this.color}`);
    const styleAttr = styleParts.length ? styleParts.join(';') : undefined;

    return svg`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        style=${styleAttr}
      >
        ${iconPath}
      </svg>
    `;
  }
}

// This declaration is useful for type-checking in other parts of a TS application.
declare global {
  interface HTMLElementTagNameMap {
    'my-icon': MyIcon;
  }
}
