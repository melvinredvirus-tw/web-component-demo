import { html } from 'lit';
import type { Meta } from '@storybook/web-components-vite';
import './my-modal';

type MyModalArgs = {
  open: boolean;
  size: string;
};

export default {
  title: 'Components/MyModal',
  component: 'my-modal',
  argTypes: {
    open: { control: 'boolean' },
    size: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A themeable modal dialog web component built with Lit. Supports slots for custom content and theming via CSS variables.',
      },
    },
  },
} satisfies Meta<MyModalArgs>;

const Template = (args: MyModalArgs) => html`
  <my-modal
    ?open=${args.open}
    size=${args.size}
    @close=${() => {
      args.open = false;
    }}
  >
    <h2>Default Modal</h2>
    <p>This is a modal dialog. You can put any content here.</p>
  </my-modal>
`;

export const Default = Template.bind({});
Default.args = {
  open: true,
  size: '400x200',
};

export const Themed = (args: MyModalArgs) => html`
  <my-modal
    ?open=${args.open}
    size=${args.size}
    style="
      --color-bg: #222;
      --color-text: #fff;
      --border-color: #1976d2;
      --shadow-lg: 0 4px 24px #1976d2;
    "
    @close=${() => {
      args.open = false;
    }}
  >
    <h2>Themed Modal</h2>
    <p>This modal uses custom theme variables.</p>
  </my-modal>
`;
Themed.args = {
  open: true,
  size: '400x200',
};
