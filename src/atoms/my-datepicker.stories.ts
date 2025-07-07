import { html } from 'lit';
import type { Meta } from '@storybook/web-components-vite';
import type { MyDatePicker } from './my-datepicker';
import './my-datepicker';

type MyDatePickerArgs = MyDatePicker

export default {
  title: 'Atoms/MyDatePicker',
  component: 'my-date-picker',
  argTypes: {
    value: { control: 'text' },
    name: { control: 'text' },
    min: { control: 'text' },
    max: { control: 'text' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    required: { control: 'boolean' },
    ariaInvalid: { control: 'text', name: 'aria-invalid' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A reusable, accessible, themeable, and responsive date picker atom built with Lit.',
      },
    },
  },
} satisfies Meta<MyDatePickerArgs>;

const Template = (args: MyDatePickerArgs) => html`
  <my-date-picker
    .value=${args.value}
    name=${args.name}
    min=${args.min}
    max=${args.max}
    ?disabled=${args.disabled}
    placeholder=${args.placeholder}
    label=${args.label}
    ?required=${args.required}
    aria-invalid=${args.ariaInvalid}
  ></my-date-picker>
`;

export const Default = Template.bind({});
Default.args = {
  value: '',
  name: '',
  min: '',
  max: '',
  disabled: false,
  placeholder: '',
  label: 'Pick a date',
  required: false,
  ariaInvalid: '',
} as MyDatePickerArgs;

export const WithMinMax = () => html`
  <my-date-picker
    label="Event Date"
    min="2024-07-01"
    max="2025-12-31"
    required
  ></my-date-picker>
`;

export const Disabled = () => html`
  <my-date-picker label="Disabled" disabled value="2025-01-01"></my-date-picker>
`;

export const DatePickerError = () => html`
  <my-date-picker aria-invalid="true" label="Error state"></my-date-picker>
`;

export const Themed = () => html`
  <my-date-picker
    label="Themed Date"
    style="
      --color-primary: #28a745;
      --color-error: #e60100;
      --color-bg: #222;
      --color-text: #fff;
    "
  ></my-date-picker>
`;
