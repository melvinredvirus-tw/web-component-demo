import { html } from 'lit';
import type { MyButton } from './my-button';
import type { Meta } from '@storybook/web-components-vite';
import './my-button';

type ButtonArgs = MyButton & {
  slotContent: string | ReturnType<typeof html>
}

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
    slotContent: {control: 'text'},
  },
  parameters: {
    docs: {
      description: {
        component:
          'A reusable button atom with theming and accessibility support.',
      },
    },
  },
} satisfies Meta<ButtonArgs>;


const Template = (args: ButtonArgs) => html`
  <my-button
    .type=${args.type}
    .label=${args.label}
    ?disabled=${args.disabled}
  >${args.slotContent}</my-button>
`;

export const Default = Template.bind({});
Default.args = {
  type: 'button',
  label: 'Click Me',
  disabled: false,
  slotContent: '',
} as ButtonArgs;

export const WithSlot = Template.bind({});

WithSlot.args = {
  type: 'button',
  label: 'Click Me',
  disabled: false,
  slotContent: html`<span>Custom <strong>Slot</strong> Content</span>`
} as ButtonArgs;

export const Disabled = Template.bind({});

Disabled.args = {
  type: 'button',
  label: 'Disabled',
  disabled: true,
  slotContent: '',
} as ButtonArgs;

export const Themed = (args: ButtonArgs) => html`
  <my-button
    .type=${args.type}
    .label=${args.label}
    ?disabled=${args.disabled}
    style="--color-primary: #28a745; --color-accent: #e60100;"
  >${args.slotContent}</my-button>
`;

Themed.args = {
  type: 'button',
  label: 'Themed Button',
  disabled: true,
  slotContent: '',
} as ButtonArgs;
