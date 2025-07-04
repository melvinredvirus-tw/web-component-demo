import {html} from 'lit';
import './my-checkbox';

export default {
  title: 'Atoms/MyCheckbox',
  component: 'my-checkbox',
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    label: {control: 'text', description: 'The label for the checkbox'},
    change: {
      action: 'change',
      description: 'Event fired when the checkbox state changes',
    },
  },
};

const Template = ({checked, disabled, label}) => html`
  <my-checkbox
    .checked=${checked}
    .disabled=${disabled}
    .label=${label}
    @change=${(e: CustomEvent) =>
      console.log('Checkbox changed:', e.detail.checked)}
  ></my-checkbox>
`;

export const Default = Template.bind({});
Default.args = {
  checked: false,
  disabled: false,
  label: 'Default Checkbox',
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  disabled: false,
  label: 'Checked Checkbox',
};

export const Disabled = Template.bind({});
Disabled.args = {
  checked: false,
  disabled: true,
  label: 'Disabled Checkbox',
};

export const Themed = () => html`
  <my-checkbox
    .label="Themed Checkbox"
    style="--checkbox-bg-checked: #28a745; --checkbox-border-color-checked: #28a745;"
  ></my-checkbox>
`;
