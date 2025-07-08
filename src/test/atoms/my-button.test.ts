import { fixture, html, expect } from '@open-wc/testing';
import '../../atoms/my-button';

suite('my-button', () => {
  test('renders as HTMLElement', async () => {
    const el = await fixture(html`<my-button></my-button>`);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('renders label via property', async () => {
    const el = await fixture(html`<my-button label="Click me"></my-button>`);
    const button = el.shadowRoot!.querySelector('button');
    expect(button?.textContent).to.contain('Click me');
  });

  test('applies type attribute', async () => {
    const el = await fixture(html`<my-button type="submit"></my-button>`);
    const button = el.shadowRoot!.querySelector('button');
    expect(button?.getAttribute('type')).to.equal('submit');
  });

  test('applies disabled attribute', async () => {
    const el = await fixture(html`<my-button disabled></my-button>`);
    const button = el.shadowRoot!.querySelector('button');
    expect(button?.hasAttribute('disabled')).to.be.true;
    expect(button?.getAttribute('aria-disabled')).to.equal('true');
  });
});