import './my-banner-box'; // ensure this registers the component
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/MyBannerBox',
  component: 'my-banner-box',
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: {
    title: 'Info Banner',
    description: 'This is an informational message.',
    type: 'info',
  },
};

export const Success: Story = {
  args: {
    title: 'Upload Complete',
    description: 'Your files have been saved.',
    type: 'success',
  },
};

export const Warning: Story = {
  args: {
    title: 'Low Disk Space',
    description: 'Consider cleaning up unused files.',
    type: 'warning',
  },
};

export const Error: Story = {
  args: {
    title: 'Upload Failed',
    description: 'There was an issue with your request.',
    type: 'error',
  },
};

export const WithSlot: Story = {
  args: {
    title: 'Custom Banner',
    type: 'success',
  },
  render: (args) => html`
    <my-banner-box title=${args.title} type=${args.type}>
      <p><em>This is slotted content inside the banner.</em></p>
    </my-banner-box>
  `,
};
