import {html} from 'lit';
import './loader-skeleton';

export default {
  title: 'Components/LoaderSkeleton',
  component: 'loader-skeleton',
  argTypes: {
    shape: {
      control: {type: 'select'},
      options: ['rect', 'circle', 'text'],
    },
    size: {
      control: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A flexible skeleton loader component for loading states. Supports shape and size props, and theming via CSS variables.',
      },
    },
  },
};

interface LoaderSkeletonArgs {
  shape: 'rect' | 'circle' | 'text';
  size: string;
}

export const Default = (args: LoaderSkeletonArgs) => html`
  <loader-skeleton shape=${args.shape} size=${args.size}></loader-skeleton>
`;

Default.args = {
  shape: 'rect',
  size: '100x20',
};

export const Circle = () => html`
  <loader-skeleton shape="circle" size="40x40"></loader-skeleton>
`;

export const Text = () => html`
  <loader-skeleton shape="text"></loader-skeleton>
`;

export const Themed = () => html`
  <loader-skeleton
    shape="rect"
    size="200x30"
    style="--skeleton-bg: linear-gradient(90deg, #e0e0e0 25%, #bdbdbd 37%, #e0e0e0 63%);"
  ></loader-skeleton>
`;
