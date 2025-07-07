// my-banner-box.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('my-banner-box')
export class MyBannerBox extends LitElement {
  @property() override title = 'Notice';
  @property() description = '';
  @property() type: 'info' | 'success' | 'warning' | 'error' = 'info';
  @state() private isVisible = false;

  static override styles = css`
    .banner {
      padding: 16px;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      color: #fff;
    }
    .info { background-color: #007bff; }
    .success { background-color: #28a745; }
    .warning { background-color: #ffc107; color: #212529; }
    .error { background-color: #dc3545; }
    .title { font-weight: bold; }
    .close-btn {
      background: none;
      border: none;
      color: inherit;
      font-size: 20px;
      cursor: pointer;
    }
  `;

  override render() {
    if (!this.isVisible) return null;

    return html`
      <div class="banner ${this.type}">
        <div>
          <div class="title">${this.title}</div>
          <div>${this.description}</div>
          <slot></slot>
        </div>
        <button class="close-btn" @click=${this._close}>&times;</button>
      </div>
    `;
  }

  private _close() {
    this.isVisible = false;
  }

  public show(title: string, description: string, type: string) {
    this.title = title;
    this.description = description;
    this.type = type as any;
    this.isVisible = true;
  }
}
