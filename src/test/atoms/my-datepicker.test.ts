import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../../atoms/my-datepicker';

suite('my-date-picker', () => {
  test('renders as HTMLElement', async () => {
    const el = await fixture(html`<my-date-picker></my-date-picker>`);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('renders with label and asterisk if required', async () => {
    const el = await fixture(html`
      <my-date-picker label="Birthdate" required></my-date-picker>
    `);
    const label = el.shadowRoot!.querySelector('label');
    expect(label?.textContent).to.contain('Birthdate');
    expect(label?.textContent).to.contain('*');
  });

  test('renders input with value, name, min, max, and placeholder', async () => {
    const el = await fixture(html`
      <my-date-picker
        value="2025-01-01"
        name="dob"
        min="2000-01-01"
        max="2030-12-31"
        placeholder="Pick a date"
      ></my-date-picker>
    `);
    const input = el.shadowRoot!.querySelector('input[type="date"]')!;
    expect((input as any).value).to.equal('2025-01-01');
    expect((input as any).name).to.equal('dob');
    expect((input as any).min).to.equal('2000-01-01');
    expect((input as any).max).to.equal('2030-12-31');
    expect((input as any).placeholder).to.equal('Pick a date');
  });

  test('reflects disabled attribute on input', async () => {
    const el = await fixture(html`<my-date-picker disabled></my-date-picker>`);
    const input = el.shadowRoot!.querySelector('input[type="date"]')!;
    expect((input as any).disabled).to.be.true;
  });

  test('applies aria-invalid if set', async () => {
    const el = await fixture(html`
      <my-date-picker aria-invalid="true"></my-date-picker>
    `);
    const input = el.shadowRoot!.querySelector('input[type="date"]')!;
    expect(input.getAttribute('aria-invalid')).to.equal('true');
  });

  test('dispatches input event with updated value', async () => {
    const el = await fixture(html`<my-date-picker></my-date-picker>`);
    const input = el.shadowRoot!.querySelector('input[type="date"]')!;
    setTimeout(() => {
      (input as any).value = '2025-12-31';
      input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    });
    const event = await oneEvent(el, 'input');
    expect(event.detail.value).to.equal('2025-12-31');
  });

  test('icon is rendered and accessible', async () => {
    const el = await fixture(html`<my-date-picker></my-date-picker>`);
    const icon = el.shadowRoot!.querySelector('.icon');
    const svg = icon?.querySelector('svg');
    expect(icon).to.exist;
    expect(icon?.getAttribute('aria-hidden')).to.equal('true');
    expect(svg).to.exist;
  });

  test('hides label if not set', async () => {
    const el = await fixture(html`<my-date-picker></my-date-picker>`);
    const label = el.shadowRoot!.querySelector('label');
    expect(label).to.be.null;
  });
});
