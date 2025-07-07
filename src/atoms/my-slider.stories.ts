import { html } from 'lit';
import type { Meta } from '@storybook/web-components-vite';
import type { MySlider } from './my-slider';
import './my-slider';

export default {
  title: 'Atoms/MySlider',
  component: 'my-slider',
  argTypes: {
    label: {
      control: 'text',
      description: 'Label displayed above the slider',
    },
    values: {
      control: 'object',
      description: 'Array of values shown on the slider',
    },
  },
} satisfies Meta<MySlider>;

const Template = ({ label, values }: MySlider) => html`
  <my-slider
    .label=${label}
    .values=${values}
    @value-change=${(e: CustomEvent) =>
      console.log('Slider changed to:', e.detail)}
  ></my-slider>
`;

export const Default = Template.bind({});
Default.args = {
  label: 'Choose a number',
  values: [10, 20, 50, 100],
};

export const FewValues = Template.bind({});
FewValues.args = {
  label: 'Simple Range',
  values: [1, 2, 3],
};

export const ManyValues = Template.bind({});
ManyValues.args = {
  label: 'Extended Range',
  values: [5, 10, 15, 20, 25, 30, 35, 40],
};

export const Themed = (args: MySlider) => html`
  <my-slider
    .label=${args.label}
    .values=${args.values}
    style="
      --slider-thumb-color: hotpink;
      --slider-label-color: darkblue;
    "
    @value-change=${(e: CustomEvent) =>
      console.log('Themed slider changed to:', e.detail)}
  ></my-slider>
`;
Themed.args = {
  label: 'Themed Slider',
  values: [5, 15, 30, 60],
};
