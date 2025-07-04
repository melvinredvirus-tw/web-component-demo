import {html} from 'lit';
import './my-datepicker';

export default {
  title: 'Atoms/MyDatePicker',
  component: 'my-date-picker',
  argTypes: {
    value: {control: 'text'},
    name: {control: 'text'},
    min: {control: 'text'},
    max: {control: 'text'},
    disabled: {control: 'boolean'},
    placeholder: {control: 'text'},
    label: {control: 'text'},
    required: {control: 'boolean'},
    ariaInvalid: {control: 'text', name: 'aria-invalid'},
  },
  parameters: {
    docs: {
      description: {
        component:
          'A reusable, accessible, themeable, and responsive date picker atom built with Lit.',
      },
    },
  },
};

interface MyDatePickerArgs {
  value: string;
  name: string;
  min: string;
  max: string;
  disabled: boolean;
  placeholder: string;
  label: string;
  required: boolean;
  ariaInvalid: string;
}

export const Default = (args: MyDatePickerArgs) => html`
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

Default.args = {
  value: '',
  name: 'date',
  min: '',
  max: '',
  disabled: false,
  placeholder: '',
  label: 'Pick a date',
  required: false,
  ariaInvalid: '',
};

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

export const Error = () => html`
  <my-date-picker
    label="Invalid Date"
    aria-invalid="true"
    value="2025-01-01"
  ></my-date-picker>
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
