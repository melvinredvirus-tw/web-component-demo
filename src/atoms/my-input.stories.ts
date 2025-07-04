import {html} from 'lit';
import './my-input';

export default {
  title: 'Atoms/MyInput',
  component: 'my-input',
  argTypes: {
    value: {control: 'text'},
    name: {control: 'text'},
    type: {
      control: {type: 'select'},
      options: ['text', 'email', 'number', 'password'],
    },
    placeholder: {control: 'text'},
    disabled: {control: 'boolean'},
    ariaInvalid: {control: 'boolean', name: 'aria-invalid'},
    autocomplete: {control: 'text'},
  },
  parameters: {
    docs: {
      description: {
        component:
          'A reusable input atom with theming and accessibility support.',
      },
    },
  },
};

interface MyInputArgs {
  value: string;
  name: string;
  type: 'text' | 'email' | 'number' | 'password';
  placeholder: string;
  disabled: boolean;
  ariaInvalid: boolean;
  autocomplete: string;
}

export const Default = (args: MyInputArgs) => html`
  <my-input
    .value=${args.value}
    name=${args.name}
    type=${args.type}
    placeholder=${args.placeholder}
    ?disabled=${args.disabled}
    ?aria-invalid=${args.ariaInvalid}
    autocomplete=${args.autocomplete}
  ></my-input>
`;

Default.args = {
  value: '',
  name: 'example',
  type: 'text',
  placeholder: 'Enter text',
  disabled: false,
  ariaInvalid: false,
  autocomplete: '',
};

export const Disabled = () => html`
  <my-input name="disabled" placeholder="Disabled input" disabled></my-input>
`;

export const Error = () => html`
  <my-input
    name="error"
    placeholder="Invalid input"
    aria-invalid="true"
  ></my-input>
`;

export const Themed = () => html`
  <my-input
    name="themed"
    placeholder="Themed input"
    style="--color-primary: #28a745; --color-error: #e60100;"
  ></my-input>
`;
