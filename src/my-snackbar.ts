import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('my-snackbar')
export class MySnackbar extends LitElement {
  @property({ type: String }) message = '';
  @property({ type: Boolean, reflect: true }) visible = false;

  static override styles = css`
    :host {
      position: fixed;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      display: none;
    }
    :host([visible]) {
      display: block;
    }
    .snackbar {
      background-color: #333;
      color: #fff;
      padding: 16px 24px;
      border-radius: 4px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      animation: fade-in-out 4s ease;
    }
    @keyframes fade-in-out {
      0% {
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  `;

  show(message: string) {
    this.message = message;
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, 4000); // Snackbar will disappear after 4 seconds
  }

  override render() {
    return html`
      <div class="snackbar">${this.message}</div>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'my-snackbar': MySnackbar;
  }
}