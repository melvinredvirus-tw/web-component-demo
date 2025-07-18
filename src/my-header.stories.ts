import { html } from 'lit';
import type { Meta } from '@storybook/web-components-vite';
import './my-header';

export default {
  title: 'Atoms/MyHeader',
  component: 'my-header',
  parameters: {
    docs: {
      description: {
        component:
          'A flexible, themeable header bar built with Lit, supporting slots for title and actions.',
      },
    },
  },
} satisfies Meta;

const Template = () => html`
  <my-header>
    <span slot="title">My Shop</span>
    <button slot="actions">Login</button>
    <button slot="actions">Cart</button>
  </my-header>
`;

export const Default = Template.bind({});

export const Themed = () => html`
  <my-header
    style="
    --header-bg: #222;
    --header-title-color: #fff;
    --header-shadow: 0 2px 8px #1976d2;
    --header-title-size: 2.5rem;
  "
  >
    <span slot="title">Dark Header</span>
    <button slot="actions">Profile</button>
  </my-header>
`;

export const OnlyTitle = () => html`
  <my-header>
    <span slot="title">Only Title</span>
  </my-header>
`;

export const OnlyActions = () => html`
  <my-header>
    <button slot="actions">Login</button>
    <button slot="actions">Cart</button>
  </my-header>
`;
