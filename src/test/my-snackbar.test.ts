import { fixture, html, expect } from '@open-wc/testing';
import '../my-snackbar';
import type { MySnackbar } from '../my-snackbar';

suite('Snackbar Rendering', () => {
  test('my-snackbar renders', async () => {
    const el = await fixture(html`<my-snackbar></my-snackbar>`);

    expect(el).to.be.instanceOf(HTMLElement);
  });
});

suite('Snackbar Interaction', () => {
  test('shows message and becomes visible when show() is called', async () => {
    const el = await fixture<MySnackbar>(html`<my-snackbar></my-snackbar>`);

    el.show('Hello world!');
    await el.updateComplete;

    expect(el.visible).to.be.true;
    expect(el.message).to.equal('Hello world!');
    expect((el.shadowRoot as ShadowRoot).textContent).to.contain('Hello world!');
  });

  test('hides after 4 seconds when show() is called', async () => {
    const el = await fixture<MySnackbar>(html`<my-snackbar></my-snackbar>`);

    el.show('Timed message');
    await el.updateComplete;

    expect(el.visible).to.be.true;
    await new Promise((resolve) => setTimeout(resolve, 4100));
    await el.updateComplete;
    expect(el.visible).to.be.false;
  });

  test('visible attribute reflects property', async () => {
    const el = await fixture<MySnackbar>(html`<my-snackbar visible></my-snackbar>`);

    expect(el.hasAttribute('visible')).to.be.true;

    el.visible = false;
    await el.updateComplete;

    expect(el.hasAttribute('visible')).to.be.false;
  });
});
