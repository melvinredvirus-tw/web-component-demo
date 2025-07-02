import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('my-form')
export class MyForm extends LitElement {
  static override styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 320px;
      margin: 0 auto;
      padding: 16px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background: #fafafa;
    }
    label {
      font-weight: 500;
    }
    input {
      padding: 8px;
      font-size: 1rem;
      border: 1px solid #bbb;
      border-radius: 4px;
    }
    button {
      background: #1976d2;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }
    button:hover {
      background: #1565c0;
    }
  `;

  // ...existing code...
  private _onSubmit(e: Event) {
    e.preventDefault();
    const data: Record<string, string> = {};

    // Get all assigned elements from the slot
    const slot = this.renderRoot.querySelector('slot');
    const assignedElements = slot
      ? (slot as HTMLSlotElement).assignedElements({flatten: true})
      : [];

    // Find all form fields inside assigned elements
    assignedElements.forEach((el) => {
      // If the element is a label, search its children
      const inputs = el.querySelectorAll
        ? el.querySelectorAll('input[name], select[name], textarea[name]')
        : [];
      inputs.forEach((input: Element) => {
        const field = input as
          | HTMLInputElement
          | HTMLSelectElement
          | HTMLTextAreaElement;
        data[field.name] = field.value;
      });
      // If the element itself is a field
      if (
        (el instanceof HTMLInputElement ||
          el instanceof HTMLSelectElement ||
          el instanceof HTMLTextAreaElement) &&
        el.name
      ) {
        data[el.name] = el.value;
      }
    });
    console.info('Form submitted with data:', data);
    this.dispatchEvent(
      new CustomEvent('form-submit', {
        detail: data,
        bubbles: true,
        composed: true,
      })
    );

    // Optionally reset fields
    assignedElements.forEach((el) => {
      if (el instanceof HTMLFormElement) {
        el.reset();
      } else if (el.querySelectorAll) {
        el.querySelectorAll('input, select, textarea').forEach(
          (input: Element) => {
            if (
              input instanceof HTMLInputElement ||
              input instanceof HTMLTextAreaElement
            ) {
              input.value = '';
            }
            if (input instanceof HTMLSelectElement) {
              input.selectedIndex = 0;
            }
          }
        );
      }
    });
  }
  // ...existing code...

  override render() {
    return html`
      <form @submit=${this._onSubmit}>
        <slot></slot>
        <button type="submit">Submit</button>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-form': MyForm;
  }
}
