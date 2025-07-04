import {html} from 'lit';
import './my-modal';

export default {
  title: 'Components/MyModal',
  component: 'my-modal',
  parameters: {
    docs: {
      description: {
        component:
          'A themeable modal dialog web component built with Lit. Supports slots for custom content and theming via CSS variables.',
      },
    },
  },
  argTypes: {
    open: {control: 'boolean'},
    size: {control: 'text'},
  },
};

export const Default = (args: Record<string, unknown>) => html`
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

Default.args = {
  open: true,
  size: '400x200',
};

export const Themed = (args: Record<string, unknown>) => html`
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
    <h2 style="color:var(--color-text)">Dark Themed Modal</h2>
    <p style="color:var(--color-text)">
      This modal uses custom theme variables.
    </p>
  </my-modal>
`;

Themed.args = {
  open: true,
  size: '500x250',
};

export const CustomSize = (args: Record<string, unknown>) => html`
  <my-modal
    ?open=${args.open}
    size=${args.size}
    @close=${() => {
      args.open = false;
    }}
  >
    <h2>Custom Size Modal</h2>
    <p>This modal is 600x400 pixels.</p>
  </my-modal>
`;

CustomSize.args = {
  open: true,
  size: '600x400',
};
