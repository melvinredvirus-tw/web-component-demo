import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../../atoms/my-dropdown';

suite('my-dropdown', () => {
  test('renders as HTMLElement', async () => {
    const el = await fixture(html`<my-dropdown></my-dropdown>`);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('renders placeholder text initially', async () => {
    const el = await fixture(html`<my-dropdown placeholder="Select one"></my-dropdown>`);
    const button = el.shadowRoot!.querySelector('.dropdown-button');
    expect(button?.textContent).to.include('Select one');
  });

  test('renders selected value', async () => {
    const el = await fixture(html`<my-dropdown selected="val2" .options=${[
      { value: 'val1', label: 'Option 1' },
      { value: 'val2', label: 'Option 2' },
    ]}></my-dropdown>`);
    const button = el.shadowRoot!.querySelector('.dropdown-button');
    expect(button?.textContent).to.include('val2');
  });

  test('opens menu on click', async () => {
    const el = await fixture(html`<my-dropdown .options=${[
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' }
    ]}></my-dropdown>`);
    const button = el.shadowRoot!.querySelector('button');
    button?.click();
    await (el as any).updateComplete;
    const menu = el.shadowRoot!.querySelector('.dropdown-menu');
    expect(menu).to.exist;
  });

  test('renders all options when open', async () => {
    const options = [
      { value: 'x', label: 'X' },
      { value: 'y', label: 'Y' },
      { value: 'z', label: 'Z' },
    ];
    const el = await fixture(html`<my-dropdown .options=${options}></my-dropdown>`);
    const button = el.shadowRoot!.querySelector('button');
    button?.click();
    await (el as any).updateComplete;
    const items = el.shadowRoot!.querySelectorAll('.dropdown-item');
    expect(items.length).to.equal(options.length);
    options.forEach((opt, i) => {
      expect(items[i].textContent?.trim()).to.equal(opt.label);
    });
  });

  test('selects option and closes dropdown', async () => {
    const options = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' }
    ];
    const el = await fixture(html`<my-dropdown .options=${options}></my-dropdown>`);
    const button = el.shadowRoot!.querySelector('button');
    button?.click();
    await (el as any).updateComplete;
    const item = el.shadowRoot!.querySelectorAll('.dropdown-item')[1];
    item.dispatchEvent(new Event('click', { bubbles: true, composed: true }));
    await (el as any).updateComplete;
    expect((el as any).selected).to.equal('b');
    expect(el.shadowRoot!.querySelector('.dropdown-menu')).to.not.exist;
  });

  test('dispatches change event on select', async () => {
    const options = [
      { value: 'x', label: 'X' },
      { value: 'y', label: 'Y' }
    ];
    const el = await fixture(html`<my-dropdown .options=${options}></my-dropdown>`);
    const button = el.shadowRoot!.querySelector('button');
    button?.click();
    await (el as any).updateComplete;

    const item = el.shadowRoot!.querySelectorAll('.dropdown-item')[1];
    setTimeout(() => item.dispatchEvent(new Event('click', { bubbles: true, composed: true })));

    const event = await oneEvent(el, 'change');
    expect(event.detail.value).to.equal('y');
  });

  test('does not open dropdown when disabled', async () => {
    const el = await fixture(html`<my-dropdown disabled .options=${[
      { value: 'one', label: 'One' },
    ]}></my-dropdown>`);
    const button = el.shadowRoot!.querySelector('button');
    button?.click();
    await (el as any).updateComplete;
    const menu = el.shadowRoot!.querySelector('.dropdown-menu');
    expect(menu).to.not.exist;
  });

  test('aria attributes reflect open/closed state', async () => {
    const el = await fixture(html`<my-dropdown .options=${[
      { value: '1', label: 'One' },
    ]}></my-dropdown>`);
    const button = el.shadowRoot!.querySelector('button');
    expect(button?.getAttribute('aria-expanded')).to.equal('false');
    button?.click();
    await (el as any).updateComplete;
    expect(button?.getAttribute('aria-expanded')).to.equal('true');
  });
});
