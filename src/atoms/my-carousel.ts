import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

@customElement('my-carousel')
export class MyCarousel extends LitElement {
  @property({ type: Number })  interval = 3000;
  @property({ type: Number }) transitionDuration = 500; // ms
  @property({ type: Boolean, reflect: true, converter: (value) => value !== null && value !== 'false' && value !== '0' }) autoplay = true;
  @property({ type: Boolean, reflect: true, converter: (value) => value !== null && value !== 'false' && value !== '0' }) showButtons = true;
  @property({ type: Boolean, reflect: true, converter: (value) => value !== null && value !== 'false' && value !== '0' }) showDots = true;
  @property({ type: Boolean, reflect: true, converter: (value) => value !== null && value !== 'false' && value !== '0' }) loop = true;

  
  @state() private currentIndex = 0;
  @query('.carousel-track') private track!: HTMLElement;
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;

  static override styles = css`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      max-width: 100%;
    }

    .carousel-container {
      overflow: hidden;
    }

    .carousel-track {
      display: flex;
      transition: transform var(--carousel-transition, 0.5s) ease-in-out;
      will-change: transform;
    }

    ::slotted(*) {
      min-width: 100%;
      flex-shrink: 0;
    }

    button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.5);
      border: none;
      color: white;
      padding: 0.5rem 0.75rem;
      cursor: pointer;
      z-index: 1;
    }

    .prev {
      left: 8px;
    }

    .next {
      right: 8px;
    }

    .dots {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid white;
      cursor: pointer;
      transition: all 0.3s ease;
      opacity: 0.7;
    }

    .dot.active {
      transform: scale(1.2);
      opacity: 1;
      border-color: black;
    }

    .info { background-color: #007bff; }
    .success { background-color: #28a745; }
    .warning { background-color: #ffc107; }
    .error { background-color: #dc3545; }
    .default { background-color: #ccc; }
  `;

  override updated(changed: Map<string, unknown>) {
    if (changed.has('transitionDuration')) {
      this.style.setProperty('--carousel-transition', `${this.transitionDuration}ms`);
    }
    if (changed.has('autoplay') || changed.has('interval')) {
      this.stopAutoplay();
      if (this.autoplay) this.startAutoplay();
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.autoplay) this.startAutoplay();
  }

  override disconnectedCallback(): void {
    this.stopAutoplay();
    super.disconnectedCallback();
  }

  override render() {
    const slides = Array.from(this.children);
    return html`
      <div
        class="carousel-container"
        @mouseenter=${this.stopAutoplay}
        @mouseleave=${() => this.autoplay && this.startAutoplay()}
      >
        <div class="carousel-track" style=${this.getTransform()}>
          <slot></slot>
        </div>
      </div>

      ${this.showButtons ? html`
        <button class="prev" @click=${this.prev}>&lt;</button>
        <button class="next" @click=${this.next}>&gt;</button>
      ` : null}

      ${this.showDots ? html`
        <div class="dots">
          ${slides.map((slide, index) => {
            const type = slide.getAttribute('data-type') || 'default';
            return html`<div
              class="dot ${type} ${this.currentIndex === index ? 'active' : ''}"
              @click=${() => this.goTo(index)}
            ></div>`;
          })}
        </div>
      ` : null}
    `;
  }

  private getTransform(): string {
    return `transform: translateX(-${this.currentIndex * 100}%);`;
  }

  private next() {
    const total = this.children.length;
    if (this.currentIndex < total - 1) {
      this.currentIndex += 1;
    } else if (this.loop) {
      this.currentIndex = 0;
    }
  }

  private prev() {
    const total = this.children.length;
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    } else if (this.loop) {
      this.currentIndex = total - 1;
    }
  }

  private goTo(index: number) {
    this.currentIndex = index;
  }

  private startAutoplay() {
    if (!this.autoplayTimer && this.interval > 0) {
      this.autoplayTimer = setInterval(() => this.next(), this.interval);
    }
  }

  private stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }
}
