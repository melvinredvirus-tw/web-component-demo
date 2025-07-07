import { html } from 'lit';
import type { Meta } from '@storybook/web-components-vite';
import type { MyLoader } from './my-loader';
import './my-loader';

export default {
  title: 'Atoms/MyLoader',
  component: 'my-loader',
  argTypes: {
    label: { control: 'text' },
    size: { control: 'text' },
    color: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A reusable, accessible, themeable, and responsive spinning loader atom built with Lit.',
      },
    },
  },
} satisfies Meta<MyLoader>;

const Template = (args: MyLoader) => html`
  <my-loader
    label=${args.label}
    size=${args.size}
    color=${args.color}
  ></my-loader>
`;

export const Default = Template.bind({});
Default.args = {
  label: 'Loading...',
  size: '',
  color: '',
} as MyLoader;

export const Large = () => html`
  <my-loader size="3rem" label="Loading large..."></my-loader>
`;

export const Themed = () => html`
  <my-loader
    label="Saving..."
    size="2.5rem"
    color="#e60100"
    style="--loader-border-width: 5px;"
  ></my-loader>
`;

export const Accessible = () => html`
  <my-loader label="Content is loading, please wait"></my-loader>
`;
