import { fixture, html, expect } from '@open-wc/testing';
import '../my-form';

suite('my-form', () => {
  test('renders', async () => {
    const el = await fixture(html`<my-form></my-form>`);

    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('submits event', async () => {
    const el = await fixture(html`<my-form></my-form>`);

    const submitEvent = new Event('submit');
    let called = false;
    el.addEventListener('submit', () => { called = true; });
    el.dispatchEvent(submitEvent);

    expect(called).to.be.true;
  });
});
