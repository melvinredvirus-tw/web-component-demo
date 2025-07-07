import { LitElement, html, css } from 'lit-element';
import { customElement, property } from 'lit/decorators.js';


@customElement('my-progress')
export class MyProgress extends LitElement {
  /** Current progress value (0–100). Omit when indeterminate. */
  @property({ type: Number })
  value?: number;

  /** Indeterminate mode shows an animated stripe. */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  static override styles = css`
    :host {
      display: block;
      width: 100%;
      --progress-height: 6px;
      --progress-bg: #e5e7eb; /* tailwind gray-200 */
    }

    .track {
      width: 100%;
      height: var(--progress-height);
      background: var(--progress-bg);
      border-radius: 9999px;
      overflow: hidden;
    }

    .bar {
      height: 100%;
      background: var(--progress-fill, #3b82f6);
      border-radius: inherit;
      transform-origin: 0 50%;
      transition: width 0.3s ease, background 0.3s ease;
    }

    :host([indeterminate]) .bar {
      position: relative;
      width: 100%;
      background: none;
    }

    :host([indeterminate]) .bar::before {
      content: "";
      position: absolute;
      inset: 0;
      background: var(--progress-fill, #3b82f6);
      animation: indeterminate 1.2s infinite linear;
    }

    @keyframes indeterminate {
      0%   { transform: translateX(-100%); }
      50%  { transform: translateX(0); }
      100% { transform: translateX(100%); }
    }
  `;

  /** Clamp value between 0 and 100. */
  private get safeValue() {
    if (this.indeterminate || this.value === undefined || isNaN(this.value)) return 0;
    return Math.min(100, Math.max(0, this.value));
  }

  /** Compute default fill color based on value */
  private get fillColor() {
    const value = this.safeValue;
    if (value >= 80) return '#16a34a'; // green-600
    if (value >= 60) return '#f59e0b'; // amber-500
    return '#3b82f6'; // blue-500
  }

  override render() {
    const width = this.indeterminate ? '100%' : `${this.safeValue}%`;
    const aria = {
      role: 'progressbar',
      'aria-valuemin': this.indeterminate ? undefined : 0,
      'aria-valuemax': this.indeterminate ? undefined : 100,
      'aria-valuenow': this.indeterminate ? undefined : this.safeValue,
    } as Record<string, string | number | undefined>;

    const style = this.indeterminate
      ? ''
      : `--progress-fill: ${this.fillColor};`;

    return html`
      <div class="track" style=${style} ...=${aria}>
        <div class="bar" style="width:${width}"></div>
      </div>
    `;
  }
}
