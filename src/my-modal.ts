import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-modal')
export class MyModal extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: var(--z-index-modal, 1040);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal {
      background: var(--color-bg, #f9fafc);
      border-radius: var(--border-radius, 8px);
      border: var(--border-width, 2px) var(--border-style, solid)
        var(--border-color, #e2e8f0);
      box-shadow: var(--shadow-lg, 0 2px 16px rgba(0, 0, 0, 0.2));
      padding: var(--space-lg, 24px);
      position: relative;
      z-index: calc(var(--z-index-modal, 1040) + 1);
      display: flex;
      flex-direction: column;
      min-width: 200px;
      min-height: 100px;
      font-family: var(--font-family-sans, 'Inter', sans-serif);
    }

    .close {
      position: absolute;
      top: var(--space-sm, 8px);
      right: var(--space-md, 16px);
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--color-text, #212529);
      transition: color var(--transition-fast, 0.15s ease-in-out);
    }
    .close:hover {
      color: var(--color-accent, #ff5722);
    }
  `;

  @property({type: Boolean, reflect: true}) open = false;
  @property({type: String}) size = '400x200'; // width x height

  private get _modalStyle() {
    const [width, height] = this.size.split('x');
    return `width:${width}px;height:${height}px;`;
  }

  private _onBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) this._close();
  }

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close'));
  }

  override render() {
    if (!this.open) return null;
    return html`
      <div class="backdrop" @click=${this._onBackdropClick}>
        <div class="modal" style=${this._modalStyle}>
          <button class="close" @click=${this._close}>&times;</button>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-modal': MyModal;
  }
}
