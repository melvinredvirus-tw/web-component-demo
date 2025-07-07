import { LitElement, html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property, state } from 'lit/decorators.js';

import "./icon-element";

@customElement('my-calendar')
export class MyCalendar extends LitElement {
  static override styles = css`
    :host {
      /* Use design system variables from theme.css */
      --calendar-bg: var(--color-surface, #fff);
      --calendar-accent: var(--color-primary, #007bff);
      --calendar-today: var(--color-bg-alt, #f8f9fa);
      --calendar-border: var(--border-color, #dee2e6);
      --calendar-radius: var(--border-radius, 8px);
      --calendar-cell-size: 2.5rem;
      display: block;
      max-width: 350px;
      background: var(--calendar-bg);
      border-radius: var(--calendar-radius);
      box-shadow: var(--shadow-md, 0 2px 6px rgba(0,0,0,0.1));
      font-family: var(--font-family-sans, 'Inter', sans-serif);
      color: var(--color-text, #212529);
      border: var(--border-width, 1px) var(--border-style, solid) var(--calendar-border);
      overflow: hidden;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-sm, 8px) var(--space-md, 16px);
      background: var(--calendar-accent);
      color: #fff;
    }
    .header button {
      background: none;
      border: none;
      color: inherit;
      font-size: 1.2em;
      cursor: pointer;
      padding: 0.2em 0.5em;
      border-radius: var(--border-radius-sm, 4px);
      transition: background var(--transition-fast, 0.15s ease-in-out);
    }
    .header button:focus {
      outline: 2px solid #fff;
      background: rgba(255,255,255,0.2);
    }
    .days, .dates {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
    }
    .days {
      background: var(--color-bg-alt, #f8f9fa);
      font-size: 0.95em;
      color: var(--color-muted, #6c757d);
    }
    .dates button {
      width: var(--calendar-cell-size);
      height: var(--calendar-cell-size);
      background: none;
      border: none;
      border-radius: 50%;
      font: inherit;
      cursor: pointer;
      margin: 0.1em auto;
      transition: background var(--transition-fast, 0.15s ease-in-out), color var(--transition-fast, 0.15s ease-in-out);
    }
    .dates button:focus {
      outline: 2px solid var(--calendar-accent);
      background: var(--calendar-today);
    }
    .dates .today button {
      background: var(--calendar-today);
      font-weight: var(--font-weight-bold, 700);
    }
    .dates .selected button {
      background: var(--calendar-accent);
      color: #fff;
      font-weight: var(--font-weight-bold, 700);
    }
    @media (max-width: 500px) {
      :host {
        max-width: 100%;
      }
      .header, .days, .dates {
        font-size: 0.95em;
      }
      .dates button {
        width: 2em;
        height: 2em;
      }
    }
  `;

  @property({ attribute: false }) value: Date = new Date();
  @state() private _viewDate: Date = new Date();
  @state() private _selected: Date | null = null;

  private get _year() { return this._viewDate.getFullYear(); }
  private get _month() { return this._viewDate.getMonth(); }

  private _daysShort = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  override firstUpdated() {
    this._selected = this.value;
    this._viewDate = new Date(this.value);
  }

  private _prevMonth() {
    this._viewDate = new Date(this._year, this._month - 1, 1);
  }
  private _nextMonth() {
    this._viewDate = new Date(this._year, this._month + 1, 1);
  }
  private _selectDate(day: number) {
    const selected = new Date(this._year, this._month, day);
    this._selected = selected;
    this.dispatchEvent(new CustomEvent('date-selected', { detail: { date: selected } }));
  }

  private _isToday(day: number) {
    const today = new Date();
    return day === today.getDate() && this._month === today.getMonth() && this._year === today.getFullYear();
  }
  private _isSelected(day: number) {
    return this._selected &&
      day === this._selected.getDate() &&
      this._month === this._selected.getMonth() &&
      this._year === this._selected.getFullYear();
  }

  private _getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  override render() {
    const daysInMonth = this._getDaysInMonth(this._year, this._month);
    const firstDay = new Date(this._year, this._month, 1).getDay();
    const days: Array<number | null> = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    const monthNames = Array.from({length: 12}, (_, i) =>
      new Date(2000, i, 1).toLocaleString(undefined, { month: 'long' })
    );
    const years = Array.from({length: 21}, (_, i) => this._year - 10 + i);

    return html`
      <nav class="header" aria-label="Calendar navigation">
        <icon-element
          name="chevron-left"
          size="1.5em"
          color="#fff"
          label="Previous month"
          @click=${this._prevMonth}
          style="cursor:pointer;"
          tabindex="0"
          role="button"
          aria-label="Previous month"
        ></icon-element>
        <label style="display:inline-flex;align-items:center;gap:0.25em;">
          <select
            @change=${(e: Event) => {
              const month = Number((e.target as HTMLSelectElement).value);
              this._viewDate = new Date(this._year, month, 1);
            }}
            aria-label="Select month"
            style="font:inherit;border-radius:4px;padding:2px 4px;border:none;outline:none;min-width:5ch;"
          >
            ${monthNames.map((name, i) => html`<option value="${i}" ?selected=${i === this._month}>${name}</option>`)}
          </select>
          <select
            @change=${(e: Event) => {
              const year = Number((e.target as HTMLSelectElement).value);
              this._viewDate = new Date(year, this._month, 1);
            }}
            aria-label="Select year"
            style="font:inherit;border-radius:4px;padding:2px 4px;border:none;outline:none;min-width:5ch;"
          >
            ${years.map(y => html`<option value="${y}" ?selected=${y === this._year}>${y}</option>`)}
          </select>
        </label>
        <icon-element
          name="chevron-right"
          size="1.5em"
          color="#fff"
          label="Next month"
          @click=${this._nextMonth}
          style="cursor:pointer;"
          tabindex="0"
          role="button"
          aria-label="Next month"
        ></icon-element>
      </nav>
      <div class="days" role="row">
        ${this._daysShort.map(day => html`<span role="columnheader">${day}</span>`)}
      </div>
      <div class="dates" role="rowgroup">
        ${days.map(day =>
          day
            ? html`<span class="${this._isToday(day) ? 'today' : ''} ${this._isSelected(day) ? 'selected' : ''}">
                <button
                  @click=${() => this._selectDate(day)}
                  aria-current=${ifDefined(this._isToday(day) ? 'date' : undefined)}
                  aria-selected=${ifDefined(this._isSelected(day) ? 'true' : undefined)}
                  tabindex="0"
                >
                  ${day}
                </button>
              </span>`
            : html`<span></span>`
        )}
      </div>
    `;
  }
}

// For testability, export the class
export default MyCalendar;
