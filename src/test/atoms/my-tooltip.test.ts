import { fixture, html, expect } from '@open-wc/testing';
import '../../atoms/my-tooltip';

suite('my-tooltip', () => {
  test('renders as HTMLElement', async () => {
    const el = await fixture(html`<my-tooltip></my-tooltip>`);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('renders tooltip text', async () => {
    const el = await fixture(html`<my-tooltip text="Hello!"></my-tooltip>`);
    const tooltip = el.shadowRoot!.querySelector('.tooltip-content');
    expect(tooltip?.textContent).to.contain('Hello!');
  });

  test('applies position attribute', async () => {
    const el = await fixture(html`<my-tooltip position="bottom" text="Bottom"></my-tooltip>`);
    const tooltip = el.shadowRoot!.querySelector('.tooltip-content');
    expect(tooltip?.getAttribute('data-position')).to.equal('bottom');
  });

  test('applies theme attribute', async () => {
    const el = await fixture(html`<my-tooltip theme="dark" text="Dark"></my-tooltip>`);
    expect(el.getAttribute('theme')).to.equal('dark');
    const tooltip = el.shadowRoot!.querySelector('.tooltip-content');
    const computed = getComputedStyle(tooltip as HTMLElement);
    expect(computed.backgroundColor).to.exist;
  });

  test('shows tooltip when open is true', async () => {
    const el = await fixture(html`<my-tooltip open text="Show"></my-tooltip>`);
    const tooltip = el.shadowRoot!.querySelector('.tooltip-content');
    expect(getComputedStyle(tooltip as HTMLElement).opacity).to.not.equal('0');
    expect(tooltip?.getAttribute('aria-hidden')).to.equal('false');
  });

  test('hides tooltip when open is false', async () => {
    const el = await fixture(html`<my-tooltip text="Hide"></my-tooltip>`);
    const tooltip = el.shadowRoot!.querySelector('.tooltip-content');
    expect(getComputedStyle(tooltip as HTMLElement).opacity).to.equal('0');
    expect(tooltip?.getAttribute('aria-hidden')).to.equal('true');
  });

  test('toggles open on mouseenter and mouseleave', async () => {
    const el = await fixture(html`<my-tooltip text="Hover"></my-tooltip>`);
    el.dispatchEvent(new Event('mouseenter'));
    await (el as any).updateComplete;
    expect((el as any).open).to.be.true;
    el.dispatchEvent(new Event('mouseleave'));
    await (el as any).updateComplete;
    expect((el as any).open).to.be.false;
  });

  test('closes on Escape key', async () => {
    const el = await fixture(html`<my-tooltip open text="Escape"></my-tooltip>`);
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await (el as any).updateComplete;
    expect((el as any).open).to.be.false;
  });

  test('sets aria-expanded attribute', async () => {
    const el = await fixture(html`<my-tooltip open text="Expanded"></my-tooltip>`);
    expect((el as any).getAttribute('aria-expanded')).to.equal('true');
    (el as any).open = false;
    await (el as any).updateComplete;
    expect((el as any).getAttribute('aria-expanded')).to.equal('false');
  });
});