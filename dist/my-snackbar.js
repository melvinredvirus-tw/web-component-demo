var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
let MySnackbar = class MySnackbar extends LitElement {
    constructor() {
        super(...arguments);
        this.message = '';
        this.visible = false;
    }
    show(message) {
        this.message = message;
        this.visible = true;
        setTimeout(() => {
            this.visible = false;
        }, 4000); // Snackbar will disappear after 4 seconds
    }
    render() {
        return html `
      <div class="snackbar">${this.message}</div>
    `;
    }
};
MySnackbar.styles = css `
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
__decorate([
    property({ type: String })
], MySnackbar.prototype, "message", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MySnackbar.prototype, "visible", void 0);
MySnackbar = __decorate([
    customElement('my-snackbar')
], MySnackbar);
export { MySnackbar };
