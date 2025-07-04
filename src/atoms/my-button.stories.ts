import {html} from 'lit';
import './my-button';

export default {
  title: 'Atoms/MyButton',
  component: 'my-button',
  argTypes: {
    type: {
      control: {type: 'select'},
      options: ['button', 'submit'],
    },
    label: {control: 'text'},
    disabled: {control: 'boolean'},
  },
  parameters: {
    docs: {
      description: {
        component:
          'A reusable button atom with theming and accessibility support.',
      },
    },
  },
};

interface MyButtonArgs {
  type: 'button' | 'submit';
  label: string;
  disabled: boolean;
}

export const Default = (args: MyButtonArgs) => html`
  <my-button
    type=${args.type}
    .label=${args.label}
    ?disabled=${args.disabled}
  ></my-button>
`;

Default.args = {
  type: 'button',
  label: 'Click Me',
  disabled: false,
};

export const WithSlot = () => html`
  <my-button>
    <span>Custom <strong>Slot</strong> Content</span>
  </my-button>
`;

export const Disabled = () => html`
  <my-button disabled label="Disabled"></my-button>
`;

export const Themed = () => html`
  <my-button
    label="Themed Button"
    style="--color-primary: #28a745; --color-accent: #e60100;"
  ></my-button>
`;
