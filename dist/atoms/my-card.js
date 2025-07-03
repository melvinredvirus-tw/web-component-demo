var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
let MyCard = class MyCard extends LitElement {
    render() {
        return html `
      <div class="card">
        <slot></slot>
        <slot name="link"></slot>
      </div>
    `;
    }
};
MyCard.styles = css `
    :host {
      display: block;
      border: 1px solid #ccc;
      border-radius: 8px; 
      padding: 16px;
      max-width: 300px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `;
MyCard = __decorate([
    customElement('my-card')
], MyCard);
export { MyCard };
