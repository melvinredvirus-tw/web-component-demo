var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
let MyForm = class MyForm extends LitElement {
    _onSubmit(e) {
        e.preventDefault();
        const data = {};
        // Get all assigned elements from the slot
        const slot = this.renderRoot.querySelector('slot');
        const assignedElements = slot
            ? slot.assignedElements({ flatten: true })
            : [];
        // Find all form fields inside assigned elements
        assignedElements.forEach((el) => {
            // If the element is a label, search its children
            const inputs = el.querySelectorAll
                ? el.querySelectorAll('input[name], select[name], textarea[name]')
                : [];
            inputs.forEach((input) => {
                const field = input;
                data[field.name] = field.value;
            });
            // If the element itself is a field
            if ((el instanceof HTMLInputElement ||
                el instanceof HTMLSelectElement ||
                el instanceof HTMLTextAreaElement) &&
                el.name) {
                data[el.name] = el.value;
            }
        });
        console.info('Form submitted with data:', data);
        this.dispatchEvent(new CustomEvent('form-submit', {
            detail: data,
            bubbles: true,
            composed: true,
        }));
        // Optionally reset fields
        assignedElements.forEach((el) => {
            if (el instanceof HTMLFormElement) {
                el.reset();
            }
            else if (el.querySelectorAll) {
                el.querySelectorAll('input, select, textarea').forEach((input) => {
                    if (input instanceof HTMLInputElement ||
                        input instanceof HTMLTextAreaElement) {
                        input.value = '';
                    }
                    if (input instanceof HTMLSelectElement) {
                        input.selectedIndex = 0;
                    }
                });
            }
        });
    }
    render() {
        return html `
      <form @submit=${this._onSubmit}>
        <slot></slot>
        <button type="submit">Submit</button>
      </form>
    `;
    }
};
MyForm.styles = css `
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
MyForm = __decorate([
    customElement('my-form')
], MyForm);
export { MyForm };
