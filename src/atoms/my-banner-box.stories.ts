import './my-banner-box';
import { html } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { MyBannerBox } from './my-banner-box';

type Args = Partial<MyBannerBox> & { slotContent?: string };

const meta = {
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
} satisfies Meta<Args>;

export default meta;

type Story = StoryObj<Args>;

const Template = (args: Args) => html`
  <my-banner-box
    .title=${args.title}
    .description=${args.description}
    .type=${args.type}
  >
    ${args.slotContent ? unsafeHTML(args.slotContent) : ''}
  </my-banner-box>
`;

export const Info: Story = {
  render: Template,
  args: {
    title: 'Info Banner',
    description: 'This is an informational message.',
    type: 'info',
  },
};

export const Success: Story = {
  render: Template,
  args: {
    title: 'Upload Complete',
    description: 'Your files have been saved.',
    type: 'success',
  },
};

export const Warning: Story = {
  render: Template,
  args: {
    title: 'Low Disk Space',
    description: 'Consider cleaning up unused files.',
    type: 'warning',
  },
};

export const Error: Story = {
  render: Template,
  args: {
    title: 'Upload Failed',
    description: 'There was an issue with your request.',
    type: 'error',
  },
};

export const WithSlot: Story = {
  render: (args) => html`
    <my-banner-box
      .title=${args.title}
      .description=${args.description}
      .type=${args.type}
    >
      <p><em>This is slotted content inside the banner.</em></p>
    </my-banner-box>
  `,
  args: {
    title: 'Custom Banner',
    type: 'success',
    description: '',
  },
};
