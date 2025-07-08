import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../../atoms/my-slider';

suite('my-slider', () => {
  test('renders as HTMLElement', async () => {
    const el = await fixture(html`<my-slider values=${[1, 2, 3]}></my-slider>`);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('renders label and current value', async () => {
  const el = await fixture(html`<my-slider .values=${[10, 20, 30]} .label=${'Volume'}></my-slider>`);
  const label = el.shadowRoot!.querySelector('label');
  expect(label?.textContent).to.contain('Volume');
  expect(label?.textContent).to.contain('10');
    });

test('renders tick labels for all values', async () => {
  const values = [5, 10, 15, 20];
  const el = await fixture(html`<my-slider .values=${values}></my-slider>`);
  const ticks = el.shadowRoot!.querySelectorAll('.value-labels span');
  expect(ticks.length).to.equal(values.length);
  values.forEach((val, i) => {
    expect(ticks[i].textContent?.trim()).to.equal(String(val));
  });
});

test('shows selected class on current value', async () => {
  const values = [1, 2, 3];
  const el = await fixture(html`<my-slider .values=${values}></my-slider>`);
  const ticks = el.shadowRoot!.querySelectorAll('.value-labels span');
  expect(ticks[0].classList.contains('selected')).to.be.true;
});

  test('updates value and selected class on input', async () => {
    const values = [100, 200, 300];
    const el = await fixture(html`<my-slider .values=${values}></my-slider>`);
    const input = el.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
    input.value = "2";
    input.dispatchEvent(new Event('input'));
    await (el as any).updateComplete;
    const label = el.shadowRoot!.querySelector('label');
    expect(label?.textContent).to.contain('300');
    const ticks = el.shadowRoot!.querySelectorAll('.value-labels span');
    expect(ticks[2].classList.contains('selected')).to.be.true;
  });

  test('dispatches value-change event on input', async () => {
    const values = [1, 2, 3];
    const el = await fixture(html`<my-slider .values=${values}></my-slider>`);
    const input = el.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
    setTimeout(() => {
      input.value = "1";
      input.dispatchEvent(new Event('input'));
    });
    const event = await oneEvent(el, 'value-change');
    expect(event).to.exist;
    expect(event.detail).to.equal(2);
  });

  test('shows "No values provided." if values is empty', async () => {
    const el = await fixture(html`<my-slider .values=${[]}></my-slider>`);
    expect(el.shadowRoot!.textContent).to.contain('No values provided.');
  });

  test('is accessible with aria attributes', async () => {
    const el = await fixture(html`<my-slider .values=${[1, 2, 3]} label="Test"></my-slider>`);
    const input = el.shadowRoot!.querySelector('input[type="range"]');
    expect(input?.getAttribute('aria-label')).to.equal('Test');
    expect(input?.hasAttribute('aria-valuemin')).to.be.true;
    expect(input?.hasAttribute('aria-valuemax')).to.be.true;
    expect(input?.hasAttribute('aria-valuenow')).to.be.true;
  });
});