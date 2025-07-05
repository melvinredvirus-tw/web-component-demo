import { fixture, html, expect } from '@open-wc/testing';
import '../loader-skeleton';

suite('loader-skeleton', () => {
  test('renders', async () => {
    const el = await fixture(html`<loader-skeleton></loader-skeleton>`);

    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('has default slot', async () => {
    const el = await fixture(html`<loader-skeleton>Loading...</loader-skeleton>`);

    expect(el.textContent).to.contain('Loading...');
  });
});
