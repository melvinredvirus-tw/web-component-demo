import {html} from 'lit';
import './my-tabs';

export default {
  title: 'Molecules/MyTabs',
  component: 'my-tabs',
  parameters: {
    docs: {
      description: {
        component:
          'A responsive, accessible, and themeable tab navigation component using slots for tabs and panels.',
      },
    },
  },
  argTypes: {
    selected: {
      control: {type: 'number', min: 0, max: 2},
      description: 'Index of the selected tab',
    },
  },
};

export const Default = (args: {selected: number}) => html`
  <my-tabs .selected=${args.selected}>
    <button slot="tab">Tab 1</button>
    <button slot="tab">Tab 2</button>
    <button slot="tab">Tab 3</button>

    <div slot="panel">Content for Tab 1</div>
    <div slot="panel">Content for Tab 2</div>
    <div slot="panel">Content for Tab 3</div>
  </my-tabs>
`;

Default.args = {
  selected: 0,
};

export const Themed = () => html`
  <my-tabs
    style="
      --tab-active-bg: #222;
      --tab-active-color: #fff;
      --tab-inactive-color: #888;
      --color-accent: #e60100;
    "
  >
    <button slot="tab">Overview</button>
    <button slot="tab">Specs</button>
    <button slot="tab">Reviews</button>

    <div slot="panel">Overview content goes here.</div>
    <div slot="panel">Specs content goes here.</div>
    <div slot="panel">Reviews content goes here.</div>
  </my-tabs>
`;

export const Responsive = () => html`
  <my-tabs>
    <button slot="tab">Short</button>
    <button slot="tab">A Very Long Tab Name</button>
    <button slot="tab">Tab 3</button>
    <button slot="tab">Tab 4</button>
    <button slot="tab">Tab 5</button>

    <div slot="panel">Short content</div>
    <div slot="panel">Long tab content</div>
    <div slot="panel">Tab 3 content</div>
    <div slot="panel">Tab 4 content</div>
    <div slot="panel">Tab 5 content</div>
  </my-tabs>
`;
