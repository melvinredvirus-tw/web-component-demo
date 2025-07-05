import { fixture, html, expect } from '@open-wc/testing';
import '../molecules/my-product-card';

suite('my-product-card', () => {
  test('renders', async () => {
    const el = await fixture(html`<my-product-card></my-product-card>`);

    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('renders slot content', async () => {
    const el = await fixture(html`
      <my-product-card>
        <span>
          Product
        </span>
      </my-product-card>
    `);

    expect(el.textContent).to.contain('Product');
  });
});
