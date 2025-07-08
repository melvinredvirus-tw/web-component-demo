import { fixture, html, expect } from '@open-wc/testing';
import '../../atoms/my-animator';

suite('my-animator', () => {
  test('renders as HTMLElement', async () => {
    const el = await fixture(html`<my-animator></my-animator>`);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('renders slot content', async () => {
    const el = await fixture(html`<my-animator><h1>Animated!</h1></my-animator>`);
    expect(el.textContent).to.contain('Animated!');
  });

  test('applies animationType class', async () => {
    const el = await fixture(html`<my-animator animationType="slide-in"></my-animator>`);
    const content = el.shadowRoot!.querySelector('.animator-content');
    expect(content?.classList.contains('slide-in')).to.be.true;
  });

  test('applies theme attribute', async () => {
    const el = await fixture(html`<my-animator theme="dark"></my-animator>`);
    expect(el.getAttribute('theme')).to.equal('dark');
    const content = el.shadowRoot!.querySelector('.animator-content');
    const computed = getComputedStyle(content as HTMLElement);
    expect(computed.backgroundColor).to.exist;
  });

  test('sets custom duration and easing', async () => {
    const el = await fixture(html`<my-animator duration=${1200} easing="linear"></my-animator>`);
    // Force update
    await (el as any).updateComplete;
    expect((el as HTMLElement).style.getPropertyValue('--animator-duration')).to.equal('1200ms');
    expect((el as HTMLElement).style.getPropertyValue('--animator-easing')).to.equal('linear');
  });

  test('is accessible with role and aria-live', async () => {
    const el = await fixture(html`<my-animator></my-animator>`);
    const content = el.shadowRoot!.querySelector('.animator-content');
    expect(content?.getAttribute('role')).to.equal('region');
    expect(content?.getAttribute('aria-live')).to.equal('polite');
  });

  test('renders correct keyframe class for "cool"', async () => {
    const el = await fixture(html`<my-animator animationType="cool"></my-animator>`);
    const content = el.shadowRoot!.querySelector('.animator-content');
    expect(content?.classList.contains('cool')).to.be.true;
  });});