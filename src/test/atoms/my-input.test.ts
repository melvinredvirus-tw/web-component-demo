import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../../atoms/my-input'; // or '../../components/my-input' based on your path

suite('my-input', () => {
  test('renders as HTMLElement', async () => {
    const el = await fixture(html`<my-input></my-input>`);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('renders default type as "text"', async () => {
    const el = await fixture(html`<my-input></my-input>`);
    const input = el.shadowRoot!.querySelector('input');
    expect(input?.getAttribute('type')).to.equal('text');
  });

  test('supports custom type, name, placeholder, autocomplete', async () => {
    const el = await fixture(html`
      <my-input
        type="email"
        name="userEmail"
        placeholder="Enter email"
        autocomplete="on"
      ></my-input>
    `);
    const input = el.shadowRoot!.querySelector('input');
    expect(input?.getAttribute('type')).to.equal('email');
    expect(input?.getAttribute('name')).to.equal('userEmail');
    expect(input?.getAttribute('placeholder')).to.equal('Enter email');
    expect(input?.getAttribute('autocomplete')).to.equal('on');
  });

  test('reflects value to the input field', async () => {
    const el = await fixture(html`<my-input .value=${'hello'}></my-input>`);
    const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
    expect(input.value).to.equal('hello');
  });

  test('emits input event with updated value', async () => {
    const el = await fixture(html`<my-input></my-input>`);
    const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;

    setTimeout(() => {
      input.value = 'testing';
      input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    });

    const event = await oneEvent(el, 'input');
    expect(event).to.exist;
    expect(event.detail.value).to.equal('testing');
  });

  test('applies disabled attribute', async () => {
    const el = await fixture(html`<my-input disabled></my-input>`);
    const input = el.shadowRoot!.querySelector('input');
    expect(input?.hasAttribute('disabled')).to.be.true;
  });

  test('sets aria-invalid attribute when provided', async () => {
    const el = await fixture(html`<my-input aria-invalid="true"></my-input>`);
    const input = el.shadowRoot!.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).to.equal('true');
  });

  test('does not set aria-invalid by default', async () => {
    const el = await fixture(html`<my-input></my-input>`);
    const input = el.shadowRoot!.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).to.equal('');
  });
});
