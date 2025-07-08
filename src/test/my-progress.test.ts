import { fixture, html, expect } from '@open-wc/testing';
import '../my-progress';

suite('my-progress', () => {
  test('renders as HTMLElement', async () => {
    const el = await fixture(html`<my-progress></my-progress>`);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('shows correct width for value', async () => {
    const el = await fixture(html`<my-progress .value=${75}></my-progress>`);
    const bar = el.shadowRoot!.querySelector('.bar') as HTMLElement;
    expect(bar.style.width).to.equal('75%');
  });

  test('clamps value above 100 to 100%', async () => {
    const el = await fixture(html`<my-progress .value=${150}></my-progress>`);
    const bar = el.shadowRoot!.querySelector('.bar') as HTMLElement;
    expect(bar.style.width).to.equal('100%');
  });

  test('clamps value below 0 to 0%', async () => {
    const el = await fixture(html`<my-progress .value=${-20}></my-progress>`);
    const bar = el.shadowRoot!.querySelector('.bar') as HTMLElement;
    expect(bar.style.width).to.equal('0%');
  });

  test('applies green fill color for value >= 80', async () => {
    const el = await fixture(html`<my-progress .value=${85}></my-progress>`);
    const track = el.shadowRoot!.querySelector('.track') as HTMLElement;
    expect(track.getAttribute('style')).to.include('#16a34a');
  });

  test('applies amber fill color for value >= 60', async () => {
    const el = await fixture(html`<my-progress .value=${65}></my-progress>`);
    const track = el.shadowRoot!.querySelector('.track') as HTMLElement;
    expect(track.getAttribute('style')).to.include('#f59e0b');
  });

  test('applies blue fill color for value < 60', async () => {
    const el = await fixture(html`<my-progress .value=${40}></my-progress>`);
    const track = el.shadowRoot!.querySelector('.track') as HTMLElement;
    expect(track.getAttribute('style')).to.include('#3b82f6');
  });

  test('renders indeterminate mode', async () => {
    const el = await fixture(html`<my-progress indeterminate></my-progress>`);
    const bar = el.shadowRoot!.querySelector('.bar') as HTMLElement;
    expect(bar.style.width).to.equal('100%');
    expect(bar.classList.contains('bar')).to.be.true;
  });

  test('hides ARIA attributes when indeterminate', async () => {
    const el = await fixture(html`<my-progress indeterminate></my-progress>`);
    const track = el.shadowRoot!.querySelector('.track')!;
    expect(track.hasAttribute('aria-valuemin')).to.be.false;
    expect(track.hasAttribute('aria-valuemax')).to.be.false;
    expect(track.hasAttribute('aria-valuenow')).to.be.false;
  });
});
