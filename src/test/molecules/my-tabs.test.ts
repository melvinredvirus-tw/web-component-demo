import { fixture, html, expect, nextFrame } from '@open-wc/testing';
import '../../molecules/my-tabs';

suite('my-tabs', () => {
  const markup = html`
    <my-tabs>
      <button slot="tab">Tab 1</button>
      <button slot="tab">Tab 2</button>
      <div slot="panel">Panel 1</div>
      <div slot="panel">Panel 2</div>
    </my-tabs>
  `;

  test('renders as HTMLElement', async () => {
    const el = await fixture(markup);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('sets correct ARIA attributes and tab index', async () => {
    const el = await fixture(markup);
    await nextFrame();

    const tabSlot = el.shadowRoot!.querySelector('slot[name="tab"]') as HTMLSlotElement;
    const panelSlot = el.shadowRoot!.querySelector('slot[name="panel"]') as HTMLSlotElement;

    const tabs = tabSlot.assignedElements({ flatten: true }) as HTMLButtonElement[];
    const panels = panelSlot.assignedElements({ flatten: true }) as HTMLDivElement[];

    tabs.forEach((tab, i) => {
      expect(tab.getAttribute('role')).to.equal('tab');
      expect(tab.getAttribute('aria-selected')).to.equal(String(i === 0));
      expect(tab.getAttribute('tabindex')).to.equal(i === 0 ? '0' : '-1');
    });

    panels.forEach((panel, i) => {
      expect(panel.getAttribute('role')).to.equal('tabpanel');
      expect(panel.getAttribute('aria-hidden')).to.equal(String(i !== 0));
      expect(getComputedStyle(panel).display).to.equal(i === 0 ? 'block' : 'none');
    });
  });

  test('updates selected tab and panel on click', async () => {
    const el = await fixture(markup);
    await nextFrame();

    const tabSlot = el.shadowRoot!.querySelector('slot[name="tab"]') as HTMLSlotElement;
    const panelSlot = el.shadowRoot!.querySelector('slot[name="panel"]') as HTMLSlotElement;

    const tabs = tabSlot.assignedElements({ flatten: true }) as HTMLButtonElement[];
    const panels = panelSlot.assignedElements({ flatten: true }) as HTMLDivElement[];

    tabs[1].click();
    await (el as any).updateComplete;

    expect(tabs[1].getAttribute('aria-selected')).to.equal('true');
    expect(tabs[1].getAttribute('tabindex')).to.equal('0');
    expect(panels[1].getAttribute('aria-hidden')).to.equal('false');
    expect(getComputedStyle(panels[1]).display).to.equal('block');

    expect(tabs[0].getAttribute('aria-selected')).to.equal('false');
    expect(getComputedStyle(panels[0]).display).to.equal('none');
  });

  test('supports keyboard navigation with ArrowRight and ArrowLeft', async () => {
    const el = await fixture(markup);
    await nextFrame();

    const tabSlot = el.shadowRoot!.querySelector('slot[name="tab"]') as HTMLSlotElement;
    const tabs = tabSlot.assignedElements({ flatten: true }) as HTMLButtonElement[];

    // Press ArrowRight from first tab
    tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await (el as any).updateComplete;
    expect((el as any).selected).to.equal(1);

    // Press ArrowLeft to go back
    tabs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await (el as any).updateComplete;
    expect((el as any).selected).to.equal(0);
  });

  test('applies correct initial selected tab from "selected" prop', async () => {
    const el = await fixture(html`
      <my-tabs selected="1">
        <button slot="tab">First</button>
        <button slot="tab">Second</button>
        <div slot="panel">Content 1</div>
        <div slot="panel">Content 2</div>
      </my-tabs>
    `);
    await nextFrame();

    const tabSlot = el.shadowRoot!.querySelector('slot[name="tab"]') as HTMLSlotElement;
    const panelSlot = el.shadowRoot!.querySelector('slot[name="panel"]') as HTMLSlotElement;

    const tabs = tabSlot.assignedElements({ flatten: true }) as HTMLButtonElement[];
    const panels = panelSlot.assignedElements({ flatten: true }) as HTMLDivElement[];

    expect(tabs[1].getAttribute('aria-selected')).to.equal('true');
    expect(getComputedStyle(panels[1]).display).to.equal('block');
    expect(getComputedStyle(panels[0]).display).to.equal('none');
  });
});
