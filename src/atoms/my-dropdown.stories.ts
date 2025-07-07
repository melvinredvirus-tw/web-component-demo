import { html } from 'lit';
import type { Meta } from '@storybook/web-components-vite';
import type { MyDropdown } from './my-dropdown';
import './my-dropdown';

export default {
  title: 'Atoms/MyDropdown',
  component: 'my-dropdown',
  argTypes: {
    options: { control: 'object' },
    selected: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A reusable dropdown atom with theming and accessibility support.',
      },
    },
  },
} satisfies Meta<MyDropdown>;

const Template = (args: MyDropdown) => html`
  <my-dropdown
    .options=${args.options}
    .selected=${args.selected}
    .placeholder=${args.placeholder}
    ?disabled=${args.disabled}
    @change=${(e: CustomEvent) => console.log('Change event:', e.detail)}
  ></my-dropdown>
`;

export const Default = Template.bind({});
Default.args = {
  options: [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ],
  selected: '',
  placeholder: 'Select a fruit',
  disabled: false,
} as MyDropdown;

export const PreSelected = Template.bind({});
PreSelected.args = {
  ...Default.args,
  selected: 'banana',
} as MyDropdown;

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
} as MyDropdown;
