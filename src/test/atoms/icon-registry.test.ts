import {expect } from '@open-wc/testing';
import { iconRegistry } from '../../atoms/icons-registry';
import { TemplateResult } from 'lit';

suite('iconRegistry', () => {
  test('has all expected icon keys', () => {
    expect(iconRegistry.has('search')).to.be.true;
    expect(iconRegistry.has('close')).to.be.true;
    expect(iconRegistry.has('menu')).to.be.true;
    expect(iconRegistry.has('user')).to.be.true;
    expect(iconRegistry.has('chevron-down')).to.be.true;
  });

  test('returns a TemplateResult for a known icon', () => {
    const icon = iconRegistry.get('search');
    expect(icon).to.be.ok;
    expect(icon).to.be.instanceOf(Object);
    // Should contain SVG elements for the search icon
    const strings = (icon as TemplateResult).strings?.join('');
    expect(strings).to.contain('circle');
    expect(strings).to.contain('line');
  });

  test('returns undefined for an unknown icon', () => {
    const icon = iconRegistry.get('not-an-icon');
    expect(icon).to.be.undefined;
  });

  test('icon TemplateResult has lit properties', () => {
    const icon = iconRegistry.get('menu');
    expect(icon).to.have.property('values');
    expect(icon).to.have.property('strings');
  });

  test('icon TemplateResult can be rendered as HTML', () => {
    const icon = iconRegistry.get('close');
    // Simulate rendering by converting to string
    const strings = (icon as TemplateResult).strings?.join('');
    expect(strings).to.contain('line');
  });
});