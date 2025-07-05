import { fixture, html, expect } from '@open-wc/testing';
import '../my-header';

suite('my-header', () => {
  test('renders', async () => {
    const el = await fixture(html`<my-header></my-header>`);

    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('reflects name property', async () => {
    const el = await fixture(html`<my-header name="Test Header"></my-header>`);

    expect(el.getAttribute('name')).to.equal('Test Header');
  });
});
