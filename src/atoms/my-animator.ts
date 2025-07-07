import { LitElement, html, css, PropertyValues } from 'lit';
import { property, customElement } from 'lit/decorators.js';

type AnimationType = 'fade-in' | 'slide-in' | 'zoom-in' |'slide-left' | 'cool';

@customElement('my-animator')
export class MyAnimator extends LitElement {
  @property({ type: String }) animationType: AnimationType = 'fade-in';
  @property({ type: Number }) duration = 500;
  @property({ type: String }) easing = 'ease-in-out';
  @property({ type: String }) theme: 'light' | 'dark' = 'light';

  static override styles = css`
    :host {
      display: inline-block;
      --animator-bg-light: #fff;
      --animator-bg-dark: #222;
      --animator-color-light: #222;
      --animator-color-dark: #fff;
      --animator-radius: 8px;
      --animator-padding: 16px;
      --animator-duration: 500ms;
      --animator-easing: ease-in-out;
      transition: background 0.2s;
    }
    .animator-content {
      background: var(--animator-bg-light);
      color: var(--animator-color-light);
      border-radius: var(--animator-radius);
      padding: var(--animator-padding);
      outline: none;
      min-width: 120px;
      min-height: 40px;
      box-sizing: border-box;
      opacity: 0;
      pointer-events: none;
      animation-duration: var(--animator-duration);
      animation-timing-function: var(--animator-easing);
      animation-fill-mode: both;
      will-change: opacity, transform;
    }
    :host([theme='dark']) .animator-content {
      background: var(--animator-bg-dark);
      color: var(--animator-color-dark);
    }
    /* Fade animation */
    .fade-in {
      animation-name: fadeIn;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    /* Slide animation */
    .slide-in {
      animation-name: slideIn;
    }
    .slide-left {
      animation-name: slideLeft;
    }
    @keyframes slideLeft {
      from { opacity: 0; transform: translateX(-50px);}
      to   { opacity: 1; transform: translateX(0);}
    }
    
    .cool {
      animation-name: cool;
    }
      
   @keyframes cool {
  0%   { opacity: 0;   transform: translateX(-24px);}
  30%  { opacity: 0.6; transform: translateX(6px);}
  60%  { opacity: 1;   transform: translateX(12px);}
  80%  { opacity: 1;   transform: translateX(4px);}
  100% { opacity: 1;   transform: translateX(0);}
}
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(50px);}
      to   { opacity: 1; transform: translateY(0);}
    }
    /* Zoom animation */
    .zoom-in {
      animation-name: zoomIn;
    }
    @keyframes zoomIn {
      from { opacity: 0; transform: scale(0.8);}
      to   { opacity: 1; transform: scale(1);}
    }
    /* Responsive */
    @media (max-width: 600px) {
      .animator-content {
        padding: 8px;
        font-size: 14px;
      }
    }
    /* Show content when active */
    :host([active]) .animator-content {
      opacity: 1;
      pointer-events: auto;
    }
  `;

  protected override updated(changed: PropertyValues) {
      if (changed.has('duration') || changed.has('easing')) {
      this.style.setProperty('--animator-duration', `${this.duration}ms`);
      this.style.setProperty('--animator-easing', this.easing);
      }
  }

  override render() {
    return html`
      <div
        class="animator-content ${this.animationType}"
        tabindex="0"
        role="region"
        aria-live="polite"
        part="animator"
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-animator': MyAnimator;
  }
}
