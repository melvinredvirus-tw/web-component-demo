import { fixture, html, expect } from '@open-wc/testing';
import '../../molecules/my-accordion';

suite('my-accordion', () => {
  test('renders', async () => {
    const el = await fixture(html`<my-accordion></my-accordion>`);

    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('expands/collapses', async () => {
    const el = await fixture(html`<my-accordion></my-accordion>`);

    el.setAttribute('open', '');
    expect(el.hasAttribute('open')).to.be.true;

    el.removeAttribute('open');
    expect(el.hasAttribute('open')).to.be.false;
  });
});
