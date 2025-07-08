import { fixture, html, expect } from '@open-wc/testing';
import '../../atoms/my-banner-box';

suite('my-banner-box', () => {
  test('renders as HTMLElement', async () => {
    const el = await fixture(html`<my-banner-box></my-banner-box>`);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('renders slot content', async () => {
    const el = await fixture(html`<my-banner-box><span>Banner Content</span></my-banner-box>`);
    expect(el.textContent).to.contain('Banner Content');
  });

  test('applies theme attribute', async () => {
    const el = await fixture(html`<my-banner-box theme="dark"></my-banner-box>`);
    expect(el.getAttribute('theme')).to.equal('dark');
  });

  });