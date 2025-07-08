import { html } from 'lit';
import type { Meta } from '@storybook/web-components-vite';
import type { StoryObj } from '@storybook/web-components';
import './my-progress';

// Storybook metadata
const meta: Meta = {
  title: 'Components/MyProgress',
  component: 'my-progress',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Progress value between 0 and 100',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Show indeterminate loading animation',
    },
  },
};
export default meta;

type Story = StoryObj;

// ✅ Determinate progress
export const Determinate: Story = {
  args: {
    value: 65,
    indeterminate: false,
  },
  render: ({ value, indeterminate }) => html`
    <div style="width: 300px; padding: 1rem;">
      <my-progress .value=${value} ?indeterminate=${indeterminate}></my-progress>
    </div>
  `,
};

// 🔄 Indeterminate loading animation
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
  render: ({ indeterminate }) => html`
    <div style="width: 300px; padding: 1rem;">
      <my-progress ?indeterminate=${indeterminate}></my-progress>
    </div>
  `,
};

// 🎨 Custom-colored progress using CSS variables
export const CustomColor: Story = {
  args: {
    value: 80,
  },
  render: ({ value }) => html`
    <div style="width: 300px; padding: 1rem;">
      <my-progress
        .value=${value}
        style="--progress-bg: #fce7f3; --progress-fill: #db2777;"
      ></my-progress>
    </div>
  `,
};
