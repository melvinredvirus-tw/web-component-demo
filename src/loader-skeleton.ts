import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('loader-skeleton')
export class LoaderSkeleton extends LitElement {
  static override styles = css`
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

  @property({type: String}) shape: 'rect' | 'circle' | 'text' = 'rect';
  @property({type: String}) size = '100x20'; // format: widthxheight

  private get styleMap() {
    if (this.shape === 'text') {
      return '';
    }
    const [width, height] = this.size.split('x');
    return `width:${width}px;height:${height}px;`;
  }

  override render() {
    return html`
      <div class="skeleton ${this.shape}" style=${this.styleMap}></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'loader-skeleton': LoaderSkeleton;
  }
}
