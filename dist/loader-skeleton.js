var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let LoaderSkeleton = class LoaderSkeleton extends LitElement {
    constructor() {
        super(...arguments);
        this.shape = 'rect';
        this.size = '100x20'; // format: widthxheight
    }
    get styleMap() {
        if (this.shape === 'text') {
            return '';
        }
        const [width, height] = this.size.split('x');
        return `width:${width}px;height:${height}px;`;
    }
    render() {
        return html `
      <div class="skeleton ${this.shape}" style=${this.styleMap}></div>
    `;
    }
};
LoaderSkeleton.styles = css `
    .skeleton {
      background: linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%);
      background-size: 400% 100%;
      animation: shimmer 1.4s ease infinite;
      display: inline-block;
    }
    .rect {
      border-radius: 4px;
    }
    .circle {
      border-radius: 50%;
    }
    .text {
      border-radius: 4px;
      height: 1em;
      width: 8em;
    }
    @keyframes shimmer {
      0% {
        background-position: -400px 0;
      }
      100% {
        background-position: 400px 0;
      }
    }
  `;
__decorate([
    property({ type: String })
], LoaderSkeleton.prototype, "shape", void 0);
__decorate([
    property({ type: String })
], LoaderSkeleton.prototype, "size", void 0);
LoaderSkeleton = __decorate([
    customElement('loader-skeleton')
], LoaderSkeleton);
export { LoaderSkeleton };
