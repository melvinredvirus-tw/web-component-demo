import { fixture, html, expect } from '@open-wc/testing';
import '../../atoms/my-loader';

suite('my-loader', () => {
  test('renders as HTMLElement', async () => {
    const el = await fixture(html`<my-loader></my-loader>`);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('renders with default label and accessibility attributes', async () => {
    const el = await fixture(html`<my-loader></my-loader>`);
    const loader = el.shadowRoot!.querySelector('.Loader') as HTMLElement;

    expect(loader.getAttribute('role')).to.equal('status');
    expect(loader.getAttribute('aria-label')).to.equal('Loading...');
    expect(loader.getAttribute('aria-live')).to.equal('polite');
  });

  test('applies custom label via property', async () => {
    const el = await fixture(html`<my-loader label="Please wait"></my-loader>`);
    const loader = el.shadowRoot!.querySelector('.Loader') as HTMLElement;

    expect(loader.getAttribute('aria-label')).to.equal('Please wait');
  });

  test('applies custom size via property', async () => {
    const el = await fixture(html`<my-loader size="3rem"></my-loader>`);
    const style = getComputedStyle(el);

    expect(style.getPropertyValue('--loader-size').trim()).to.equal('3rem');
  });

  test('applies custom color via property', async () => {
    const el = await fixture(html`<my-loader color="red"></my-loader>`);
    const style = getComputedStyle(el);

    expect(style.getPropertyValue('--loader-color').trim()).to.equal('red');
  });

  test('has spinning animation unless prefers-reduced-motion is set', async () => {
    const el = await fixture(html`<my-loader></my-loader>`);
    const loader = el.shadowRoot!.querySelector('.Loader') as HTMLElement;
    const animation = getComputedStyle(loader).animationName;
    
    expect(animation).to.match(/spin/i);
  });
});
