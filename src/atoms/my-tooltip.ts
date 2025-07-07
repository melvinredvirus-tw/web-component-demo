import {LitElement, html, css, PropertyValues} from 'lit';
import {property, customElement} from 'lit/decorators.js';

@customElement('my-tooltip')
export class MyTooltip extends LitElement {
  @property({type: String}) text = '';
  @property({type: String}) position: 'top' | 'bottom' | 'left' | 'right' =
    'top';
  @property({type: Boolean, reflect: true}) open = false;
  @property({type: String}) theme: 'light' | 'dark' = 'light';

  static override styles = css`
    :host {
      position: relative;
      display: inline-block;
      --tooltip-bg-light: #fff;
      --tooltip-bg-dark: #222;
      --tooltip-color-light: #222;
      --tooltip-color-dark: #fff;
      --tooltip-padding: 8px 12px;
      --tooltip-radius: 4px;
      --tooltip-font-size: 14px;
      --tooltip-z: 1000;
    }
    .tooltip-content {
      position: absolute;
      z-index: var(--tooltip-z);
      background: var(--tooltip-bg-light);
      color: var(--tooltip-color-light);
      padding: var(--tooltip-padding);
      border-radius: var(--tooltip-radius);
      font-size: var(--tooltip-font-size);
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    :host([theme='dark']) .tooltip-content {
      background: var(--tooltip-bg-dark);
      color: var(--tooltip-color-dark);
    }
    :host([open]) .tooltip-content {
      opacity: 1;
      pointer-events: auto;
    }
    .tooltip-content[data-position='top'] {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-8px);
    }
    .tooltip-content[data-position='bottom'] {
      top: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(8px);
    }
    .tooltip-content[data-position='left'] {
      right: 100%;
      top: 50%;
      transform: translateY(-50%) translateX(-8px);
    }
    .tooltip-content[data-position='right'] {
      left: 100%;
      top: 50%;
      transform: translateY(-50%) translateX(8px);
    }
    @media (max-width: 600px) {
      .tooltip-content {
        font-size: 12px;
        padding: 6px 8px;
      }
    }
  `;

  private _show = () => {
    this.open = true;
  };
  private _hide = () => {
    this.open = false;
  };

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('tabindex', '0');
    this.addEventListener('mouseenter', this._show);
    this.addEventListener('mouseleave', this._hide);
    this.addEventListener('focus', this._show);
    this.addEventListener('blur', this._hide);
    this.addEventListener('keydown', this._onKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this._show);
    this.removeEventListener('mouseleave', this._hide);
    this.removeEventListener('focus', this._show);
    this.removeEventListener('blur', this._hide);
    this.removeEventListener('keydown', this._onKeyDown);
  }

  private _onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.open = false;
  };

  protected override updated(changed: PropertyValues) {
    if (changed.has('open')) {
      this.setAttribute('aria-expanded', String(this.open));
    }
  }

  override render() {
    return html`
      <slot></slot>
      <div
        class="tooltip-content"
        data-position=${this.position}
        role="tooltip"
        aria-hidden=${!this.open}
        part="tooltip"
      >
        ${this.text}
      </div>
    `;
  }
}

