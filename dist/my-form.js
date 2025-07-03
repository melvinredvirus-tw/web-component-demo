var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
let MyForm = class MyForm extends LitElement {
    // ...existing code...
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
    // ...existing code...
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
MyForm = __decorate([
    customElement('my-form')
], MyForm);
export { MyForm };
