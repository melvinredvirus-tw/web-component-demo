import { fixture, html, expect } from '@open-wc/testing';
import '../../atoms/my-checkbox';

suite('my-checkbox', () => {
  test('renders as HTMLElement', async () => {
    const el = await fixture(html`<my-checkbox></my-checkbox>`);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('renders unchecked by default', async () => {
    const el = await fixture(html`<my-checkbox></my-checkbox>`);
    const input = el.shadowRoot!.querySelector('input[type="checkbox"]')!;
    expect((input as any).checked).to.be.false;
  });

  test('renders with label text', async () => {
    const el = await fixture(html`<my-checkbox label="Accept"></my-checkbox>`);
    const label = el.shadowRoot!.querySelector('label')!;
    expect(label.textContent).to.equal('Accept');
  });

  test('toggles checked state on click', async () => {
    const el = await fixture(html`<my-checkbox></my-checkbox>`);
    const input = el.shadowRoot!.querySelector('input[type="checkbox"]') as HTMLInputElement;

    input.click();
    await (el as any).updateComplete;
    expect((el as any).checked).to.be.true;

    input.click();
    await (el as any).updateComplete;
    expect((el as any).checked).to.be.false;
  });

  test('dispatches change event when toggled', async () => {
    const el = await fixture(html`<my-checkbox></my-checkbox>`);
    const input = el.shadowRoot!.querySelector('input[type="checkbox"]') as HTMLInputElement;

    let triggered = false;
    el.addEventListener('change', () => {
      triggered = true;
    });

    input.click();
    await (el as any).updateComplete;
    expect(triggered).to.be.true;
  });

  test('respects disabled state', async () => {
    const el = await fixture(html`<my-checkbox disabled></my-checkbox>`);
    const input = el.shadowRoot!.querySelector('input[type="checkbox"]') as HTMLInputElement;

    input.click();
    await (el as any).updateComplete;

    expect((el as any).checked).to.be.false;
    expect(input.disabled).to.be.true;
  });

  test('sets correct ARIA attributes', async () => {
    const el = await fixture(html`<my-checkbox checked disabled></my-checkbox>`);
    const input = el.shadowRoot!.querySelector('input[type="checkbox"]')!;

    expect(input.getAttribute('aria-checked')).to.equal('true');
    expect(input.getAttribute('aria-disabled')).to.equal('true');
  });
});
