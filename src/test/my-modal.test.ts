import { fixture, html, expect } from '@open-wc/testing';
import '../my-modal';

suite('my-modal', () => {
  test('renders', async () => {
    const el = await fixture(html`<my-modal></my-modal>`);

    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('open/close attribute', async () => {
    const el = await fixture(html`<my-modal open></my-modal>`);

    expect(el.hasAttribute('open')).to.be.true;

    el.removeAttribute('open');

    expect(el.hasAttribute('open')).to.be.false;
  });
});
