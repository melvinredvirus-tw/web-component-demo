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
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal {
      background: #f9fafc;
      border-radius: 8px;
      border: 2px solid #e2e8f0;
      box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
      padding: 24px;
      position: relative;
      z-index: 1001;
      display: flex;
      flex-direction: column;
      min-width: 200px;
      min-height: 100px;
    }

    .close {
      position: absolute;
      top: 8px;
      right: 12px;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
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
