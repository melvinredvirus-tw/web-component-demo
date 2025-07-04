import {LitElement, html, css} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';

@customElement('my-tabs')
export class MyTabs extends LitElement {
  static override styles = css`
    :host {
      display: block;
      --tabs-bg: var(--color-bg, #fff);
      --tabs-border: var(--border-width, 1px) var(--border-style, solid)
        var(--color-border, #dee2e6);
      --tabs-radius: var(--border-radius, 8px);
      --tab-active-bg: var(--color-primary, #007bff);
      --tab-active-color: var(--color-bg, #fff);
      --tab-inactive-bg: transparent;
      --tab-inactive-color: var(--color-text, #212529);
      --tab-gap: var(--space-xs, 4px);
      --tab-padding: var(--space-sm, 8px) var(--space-md, 16px);
      --tab-font-size: var(--font-size-base, 16px);
      --tab-font-family: var(--font-family-sans, 'Inter', sans-serif);
    }
    .tabs {
      display: flex;
      background: var(--tabs-bg);
      border-radius: var(--tabs-radius) var(--tabs-radius) 0 0;
      border-bottom: var(--tabs-border);
      gap: var(--tab-gap);
      overflow-x: auto;
    }
    .tab {
      background: var(--tab-inactive-bg);
      color: var(--tab-inactive-color);
      border: none;
      border-radius: var(--tabs-radius) var(--tabs-radius) 0 0;
      padding: var(--tab-padding);
      font-size: var(--tab-font-size);
      font-family: var(--tab-font-family);
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      outline: none;
      min-width: 80px;
      white-space: nowrap;
    }
    .tab[aria-selected='true'] {
      background: var(--tab-active-bg);
      color: var(--tab-active-color);
      font-weight: var(--font-weight-bold, 700);
    }
    .tab:focus-visible {
      outline: 2px solid var(--color-accent, #ff5722);
      z-index: 1;
    }
    .panels {
      border: var(--tabs-border);
      border-top: none;
      border-radius: 0 0 var(--tabs-radius) var(--tabs-radius);
      background: var(--tabs-bg);
      padding: var(--space-md, 16px);
    }
    @media (max-width: 600px) {
      .tabs {
        gap: var(--space-xxs, 2px);
      }
      .panels {
        padding: var(--space-sm, 8px);
      }
    }
  `;

  @property({type: Number}) selected = 0;

  @queryAssignedElements({slot: 'tab'}) _tabNodes!: HTMLElement[];
  @queryAssignedElements({slot: 'panel'}) _panelNodes!: HTMLElement[];

  private _onTabClick(idx: number) {
    this.selected = idx;
    this._focusTab(idx);
  }

  private _onTabKeydown(e: KeyboardEvent, idx: number) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      this._focusTab((idx + 1) % this._tabNodes.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      this._focusTab((idx - 1 + this._tabNodes.length) % this._tabNodes.length);
    }
  }

  private _focusTab(idx: number) {
    const tab = this._tabNodes?.[idx];
    if (tab) tab.focus();
    this.selected = idx;
  }

  override render() {
    return html`
      <div class="tabs" role="tablist">
        <slot name="tab" @slotchange=${() => this.requestUpdate()}></slot>
      </div>
      <div class="panels">
        <slot name="panel"></slot>
      </div>
    `;
  }

  override updated() {
    // Set ARIA and tabIndex for tabs and panels
    this._tabNodes?.forEach((tab, idx) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', String(idx === this.selected));
      tab.setAttribute('tabindex', idx === this.selected ? '0' : '-1');
      tab.addEventListener('click', () => this._onTabClick(idx));
      tab.addEventListener('keydown', (e: KeyboardEvent) =>
        this._onTabKeydown(e, idx)
      );
    });
    this._panelNodes?.forEach((panel, idx) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-hidden', String(idx !== this.selected));
      panel.style.display = idx === this.selected ? '' : 'none';
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-tabs': MyTabs;
  }
}
