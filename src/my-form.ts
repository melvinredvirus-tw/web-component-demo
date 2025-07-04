import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-form')
export class MyForm extends LitElement {
  static override styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: var(--space-md, 16px);
      max-width: 320px;
      margin: 0 auto;
      padding: var(--space-md, 16px);
      border: var(--border-width, 1px) var(--border-style, solid)
        var(--border-color, #dee2e6);
      border-radius: var(--border-radius, 8px);
      background: var(--color-bg-alt, #f8f9fa);
      box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));
      font-family: var(--font-family-sans, 'Inter', sans-serif);
    }
    label {
      font-weight: var(--font-weight-bold, 700);
      color: var(--color-text, #212529);
      font-family: var(--font-family-sans, 'Inter', sans-serif);
    }
    input,
    select,
    textarea {
      padding: var(--space-sm, 8px);
      font-size: var(--font-size-base, 16px);
      border: var(--border-width, 1px) var(--border-style, solid)
        var(--border-color, #dee2e6);
      border-radius: var(--border-radius-sm, 4px);
      background: var(--color-bg, #fff);
      color: var(--color-text, #212529);
      font-family: var(--font-family-sans, 'Inter', sans-serif);
      transition: border-color var(--transition-fast, 0.15s ease-in-out);
    }
    input:focus,
    select:focus,
    textarea:focus {
      outline: none;
      border-color: var(--color-primary, #007bff);
    }
    button {
      background: var(--color-primary, #007bff);
      color: var(--color-bg, #fff);
      border: none;
      padding: var(--space-sm, 10px) var(--space-md, 16px);
      border-radius: var(--border-radius-sm, 4px);
      font-size: var(--font-size-base, 16px);
      cursor: pointer;
      font-family: var(--font-family-sans, 'Inter', sans-serif);
      transition: background var(--transition-fast, 0.15s ease-in-out);
    }
    button:hover {
      background: var(--color-accent, #ff5722);
    }
  `;

  @property({type: Function}) onSubmit?: (
    data: Record<string, string>,
    event: Event
  ) => void;

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

    if (typeof this.onSubmit === 'function') {
      this.onSubmit(data, e);
    } else {
      this.dispatchEvent(
        new CustomEvent('form-submit', {
          detail: data,
          bubbles: true,
          composed: true,
        })
      );
    }

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

  override render() {
    return html`
      <form @submit=${this._onSubmit}>
        <slot></slot>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-form': MyForm;
  }
}
