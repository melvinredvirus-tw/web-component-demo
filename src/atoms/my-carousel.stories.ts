import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './my-carousel';

type Args = {
  interval: number;
};

const meta = {
  title: 'Components/MyCarousel',
  component: 'my-carousel',
  tags: ['autodocs'],
  argTypes: {
    interval: {
      control: { type: 'number' },
      description: 'Autoplay interval in milliseconds',
      defaultValue: 3000,
    },
  },
} satisfies Meta<Args>;

export default meta;

type Story = StoryObj<Args>;

const Template = (args: Args) => html`
  <my-carousel interval=${args.interval} style="max-width: 600px; height: 250px;">
    <img src="https://picsum.photos/id/1018/600/250" data-type="info" />
    <img src="https://picsum.photos/id/1020/600/250" data-type="success" />
    <img src="https://picsum.photos/id/1024/600/250" data-type="warning" />
    <img src="https://picsum.photos/id/1025/600/250" data-type="error" />
  </my-carousel>
`;

export const DefaultCarousel: Story = {
  render: Template,
  args: {
    interval: 3000,
  },
};

export const FastAutoplay: Story = {
  render: Template,
  args: {
    interval: 1000,
  },
};

export const SlowAutoplay: Story = {
  render: Template,
  args: {
    interval: 7000,
  },
};
