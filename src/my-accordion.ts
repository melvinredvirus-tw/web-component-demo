import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('my-accordion')
export class MyAccordion extends LitElement {
  @property({ type: Array }) items: { title: string; content: string }[] = [];

  static override styles = css`
    .accordion {
      border: 1px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
    }
    .accordion-item {
      border-bottom: 1px solid #ccc;
    }
    .accordion-item:last-child {
      border-bottom: none;
    }
    .accordion-header {
      background-color: #f7f7f7;
      padding: 16px;
      cursor: pointer;
      font-weight: bold;
    }
    .accordion-content {
      padding: 16px;
      display: none;
      background-color: #fff;
    }
    .accordion-content[open] {
      display: block;
    }
  `;

  toggleContent(index: number) {
    const content = this.shadowRoot?.querySelector(`#content-${index}`);
    if (content) {
      const isOpen = content.hasAttribute('open');
      content.toggleAttribute('open', !isOpen);
    }
  }

  override render() {
    return html`
      <div class="accordion">
        ${this.items.map(
      (item, index) => html`
            <div class="accordion-item">
              <div
                class="accordion-header"
                @click="${() => this.toggleContent(index)}"
              >
                ${item.title}
              </div>
              <div
                class="accordion-content"
                id="content-${index}"
              >
                ${item.content}
              </div>
            </div>
          `
    )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-accordion': MyAccordion;
  }
}
