import { html, TemplateResult } from 'lit';

/**
 * The Icon Registry stores SVG path data for each icon.
 * Using a Map is efficient for lookups. Explicitly typing the map
 * ensures type safety.
 *
 * Icons are from the open-source 'Lucide' icon set.
 */
export const iconRegistry: Map<string, TemplateResult> = new Map();

iconRegistry.set('search', html`
  <circle cx="11" cy="11" r="8"></circle>
  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
`);

iconRegistry.set('close', html`
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
`);

iconRegistry.set('menu', html`
  <line x1="3" y1="12" x2="21" y2="12"></line>
  <line x1="3" y1="6" x2="21" y2="6"></line>
  <line x1="3" y1="18" x2="21" y2="18"></line>
`);

iconRegistry.set('user', html`
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
  <circle cx="12" cy="7" r="4"></circle>
`);

iconRegistry.set('chevron-down', html`
  <polyline points="6 9 12 15 18 9"></polyline>
`);
