import {html} from 'lit';
import './my-tooltip';

export default {
  title: 'Atoms/MyTooltip',
  component: 'my-tooltip',
  argTypes: {
    text: {control: 'text', description: 'Tooltip text'},
    position: {
      control: {type: 'select'},
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip position relative to trigger',
    },
    theme: {
      control: {type: 'select'},
      options: ['light', 'dark'],
      description: 'Tooltip theme',
    },
    open: {
      control: 'boolean',
      description: 'Show/hide tooltip (for testing)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A reusable, accessible, and themeable tooltip web component built with Lit.',
      },
    },
  },
};

const Template = ({text, position, theme, open}) => html`
  <my-tooltip
    text=${text}
    position=${position}
    theme=${theme}
    ?open=${open}
    style="margin: 48px;"
  >
    <button>Hover or focus me</button>
  </my-tooltip>
`;

export const Default = Template.bind({});
Default.args = {
  text: 'Tooltip content',
  position: 'top',
  theme: 'light',
  open: false,
};

export const Themed = Template.bind({});
Themed.args = {
  ...Default.args,
  theme: 'dark',
};

export const Bottom = Template.bind({});
Bottom.args = {
  ...Default.args,
  position: 'bottom',
};

export const ControlledOpen = Template.bind({});
ControlledOpen.args = {
  ...Default.args,
  open: true,
};