import { fixture, html, expect } from '@open-wc/testing';
import '../../atoms/icon-element';

suite('icon-element', () => {
  test('renders as HTMLElement', async () => {
    const el = await fixture(html`<icon-element></icon-element>`);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('renders SVG for known icon name', async () => {
    const el = await fixture(html`<icon-element name="check"></icon-element>`);
    const svg = el.shadowRoot!.querySelector('svg');
    expect(svg).to.exist;
    expect(svg!.innerHTML).to.contain('polyline');
  });

  test('does not render SVG for unknown icon name', async () => {
    const el = await fixture(html`<icon-element name="unknown"></icon-element>`);
    const svg = el.shadowRoot!.querySelector('svg');
    expect(svg).to.not.exist;
  });

  test('applies size and color CSS variables', async () => {
    const el = await fixture(html`<icon-element name="check" size="32px" color="red"></icon-element>`);
    expect((el as HTMLElement).style.getPropertyValue('--icon-size')).to.equal('32px');
    expect((el as HTMLElement).style.getPropertyValue('--icon-color')).to.equal('red');
  });

  test('sets aria-label and role when label is provided', async () => {
    const el = await fixture(html`<icon-element name="check" label="Success"></icon-element>`);
    const svg = el.shadowRoot!.querySelector('svg');
    expect(svg?.getAttribute('role')).to.equal('img');
    expect(svg?.getAttribute('aria-label')).to.equal('Success');
    expect(svg?.getAttribute('aria-hidden')).to.equal('false');
  });

  test('sets aria-hidden when label is not provided', async () => {
    const el = await fixture(html`<icon-element name="check"></icon-element>`);
    const svg = el.shadowRoot!.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).to.equal('true');
    expect(svg?.getAttribute('role')).to.equal('');
    expect(svg?.getAttribute('aria-label')).to.equal('');
  });
});