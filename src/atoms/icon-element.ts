import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('icon-element')
export class IconElement extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      width: var(--icon-size, 1em);
      height: var(--icon-size, 1em);
      color: var(--icon-color, var(--color-text, currentColor));
      /* Use design system font and transition */
      font-family: var(--font-family-sans, 'Inter', sans-serif);
      vertical-align: middle;
    }
    svg {
      width: 100%;
      height: 100%;
      stroke: currentColor;
      fill: none;
      stroke-width: var(--icon-stroke-width, 2px);
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: color var(--transition-fast, 0.15s ease-in-out);
      /* Responsive and accessible */
      display: block;
    }
  `;

  @property({ type: String }) name = '';
  @property({ type: String }) size = '';
  @property({ type: String }) color = '';
  @property({ type: String }) label?: string;


    private get iconPath() {
    // Example registry, add more icons as needed
    const icons: Record<string, unknown> = {
      check: svg`<polyline points="20 6 9 17 4 12" />`,
      alert: svg`<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/>`,
      user: svg`<circle cx="12" cy="8" r="4"/><path d="M6 20c0-2.2 3.6-4 6-4s6 1.8 6 4"/>`,
      home: svg`<path d="M3 12L12 3l9 9"/><path d="M9 21V9h6v12"/>`,
      search: svg`<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`,
      heart: svg`<path d="M12 21C12 21 4 13.36 4 8.5A4.5 4.5 0 0 1 12 4a4.5 4.5 0 0 1 8 4.5C20 13.36 12 21 12 21z"/>`,
      star: svg`<polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2"/>`,
      settings: svg`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
      plus: svg`<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
      minus: svg`<line x1="5" y1="12" x2="19" y2="12"/>`,
      "chevron-left": svg`<polyline points="15 18 9 12 15 6" />`,
      "chevron-right": svg`<polyline points="9 6 15 12 9 18" />`,
    };
    return icons[this.name] || null;
  }

  override updated() {
    // Set CSS custom properties on the host for theming
    if (this.size) {
      this.style.setProperty('--icon-size', this.size);
    } else {
      this.style.removeProperty('--icon-size');
    }
    if (this.color) {
      this.style.setProperty('--icon-color', this.color);
    } else {
      this.style.removeProperty('--icon-color');
    }
  }

  override render() {
    if (!this.iconPath) return html``;
    return svg`
      <svg
        viewBox="0 0 24 24"
        aria-hidden=${!this.label}
        role=${this.label ? 'img' : undefined}
        aria-label=${this.label || undefined}
      >
        ${this.iconPath}
      </svg>
    `;
  }
}