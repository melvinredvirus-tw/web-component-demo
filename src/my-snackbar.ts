import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('my-snackbar')
export class MySnackbar extends LitElement {
  @property({ type: String }) message = '';
  @property({ type: Boolean, reflect: true }) visible = false;

  static override styles = css`
    :host {
      position: fixed;
      top: var(--theme-snackbar-top);
      left: 50%;
      transform: translateX(-50%);
      z-index: var(--theme-snackbar-z-index);
      display: none;
    }
    :host([visible]) {
      display: block;
    }
    .snackbar {
      background-color: var(--theme-snackbar-bg);
      color: var(--theme-snackbar-color);
      padding: var(--theme-snackbar-padding);
      border-radius: var(--theme-snackbar-radius);
      box-shadow: var(--theme-snackbar-shadow);
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