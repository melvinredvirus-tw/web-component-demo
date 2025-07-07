import { html } from 'lit';
import type { Meta } from '@storybook/web-components-vite';
import type { LoaderSkeleton } from './loader-skeleton';
import './loader-skeleton';

type LoaderSkeletonArgs = LoaderSkeleton & {
  shape: 'rect' | 'circle' | 'text';
  size: string;
};

export default {
  title: 'Atoms/LoaderSkeleton',
  component: 'loader-skeleton',
  argTypes: {
    shape: {
      control: { type: 'select' },
      options: ['rect', 'circle', 'text'],
    },
    size: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A flexible skeleton loader component for loading states. Supports shape and size props, and theming via CSS variables.',
      },
    },
  },
} satisfies Meta<LoaderSkeletonArgs>;

const Template = (args: LoaderSkeletonArgs) => html`
  <loader-skeleton shape=${args.shape} size=${args.size}></loader-skeleton>
`;

export const Default = Template.bind({});
Default.args = {
  shape: 'rect',
  size: '100x20',
} as LoaderSkeletonArgs;

export const Circle = Template.bind({});
Circle.args = {
  shape: 'circle',
  size: '40x40',
} as LoaderSkeletonArgs;

export const Text = Template.bind({});
Text.args = {
  shape: 'text',
  size: '',
} as LoaderSkeletonArgs;

export const Themed = () => html`
  <loader-skeleton
    shape="rect"
    size="100x20"
    style="--skeleton-bg: #222; --skeleton-highlight: #444;"
  ></loader-skeleton>
`;
