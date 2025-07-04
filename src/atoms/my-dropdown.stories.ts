import {html} from 'lit';
import './my-dropdown';

export default {
  title: 'Components/MyDropdown',
  component: 'my-dropdown',
  tags: ['autodocs'],
  argTypes: {
    options: {control: 'object'},
    selected: {control: 'text'},
    placeholder: {control: 'text'},
    disabled: {control: 'boolean'},
    onChange: {action: 'change'},
  },
};

const Template = ({options, selected, placeholder, disabled}: any) => html`
  <my-dropdown
    .options=${options}
    .selected=${selected}
    .placeholder=${placeholder}
    ?disabled=${disabled}
    @change=${(e: CustomEvent) => console.log('Change event:', e.detail)}
  ></my-dropdown>
`;

export const Default = Template.bind({});
Default.args = {
  options: [
    {value: 'apple', label: 'Apple'},
    {value: 'banana', label: 'Banana'},
    {value: 'cherry', label: 'Cherry'},
  ],
  selected: '',
  placeholder: 'Select a fruit',
  disabled: false,
};

export const PreSelected = Template.bind({});
PreSelected.args = {
  ...Default.args,
  selected: 'banana',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};
