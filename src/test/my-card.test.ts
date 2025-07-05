import { fixture, html, expect } from '@open-wc/testing';
import '../atoms/my-card';

suite('my-card', () => {
  test('renders', async () => {
    const el = await fixture(html`<my-card></my-card>`);

    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('slot content', async () => {
    const el = await fixture(html`<my-card><span>Card Content</span></my-card>`);

    expect(el.textContent).to.contain('Card Content');
  });
});
