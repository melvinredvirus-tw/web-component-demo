import { html } from 'lit';
import type { Meta } from '@storybook/web-components-vite';
import type { MyInput } from './my-input';
import './my-input';

type MyInputArgs = Omit<MyInput, 'ariaInvalid'> & {
  ariaInvalid: boolean;
};

export default {
  title: 'Atoms/MyInput',
  component: 'my-input',
  argTypes: {
    value: { control: 'text' },
    name: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'number', 'password'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    ariaInvalid: { control: 'boolean', name: 'aria-invalid' },
    autocomplete: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A reusable input atom with theming and accessibility support.',
      },
    },
  },
} satisfies Meta<MyInputArgs>;

const Template = (args: MyInputArgs) => html`
  <my-input
    .value=${args.value}
    name=${args.name}
    type=${args.type}
    placeholder=${args.placeholder}
    ?disabled=${args.disabled}
    .aria-invalid=${args.ariaInvalid}
    autocomplete=${args.autocomplete}
  ></my-input>
`;

export const Default = Template.bind({});
const defaultArgs = {
  value: '',
  name: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  ariaInvalid: false,
  autocomplete: '',
} as MyInputArgs;

Default.args = defaultArgs;

export const Disabled = (args: MyInputArgs) => html`
  <my-input name="disabled" placeholder="Disabled input" disabled></my-input>
`;

export const InputError = () => html`
  <my-input aria-invalid="true" label="Error state"></my-input>
`;

export const Themed = () => html`
  <my-input
    style="--color-primary: #28a745; --color-error: #e60100;"
    label="Themed Input"
  ></my-input>
`;
