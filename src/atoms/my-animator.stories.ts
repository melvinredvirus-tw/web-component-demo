import { html } from 'lit';
import './my-animator';

export default {
  title: 'Atoms/MyAnimator',
  component: 'my-animator',
  argTypes: {
    animationType: {
      control: { type: 'select' },
      options: ['fade-in', 'slide-in', 'zoom-in ', 'slide-left', 'cool'],
      description: 'Type of animation to apply',
      defaultValue: 'fade-in',
    },
    duration: {
      control: { type: 'number' },
      description: 'Duration of the animation in milliseconds',
      defaultValue: 500,
    },
    easing: {
      control: { type: 'select' },
      options: ['linear', 'ease-in', 'ease-out', 'ease-in-out'],
      description: 'Easing function for the animation',
      defaultValue: 'ease-in-out',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme for the animator',
      defaultValue: 'light',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A reusable, accessible, performant, and themeable animator web component built with Lit.

**Features:**
- Atomic and reusable (slot-based, configurable via attributes/properties)
- Testable (all props are public, easy to test)
- Accessible (\`role="region"\`, \`aria-live\`, \`aria-hidden\`)
- Responsive (adapts padding/font-size for small screens)
- Theming (light/dark via \`theme\` attribute and CSS vars)
- Keyframes: fade, slide, and zoom animations
        `,
      },
    },
  },
};

const Template = ({
  animationType,
  duration,
  easing,
  theme,
}) => html`
  <my-animator
    animationType=${animationType}
    duration=${duration}
    easing=${easing}
    theme=${theme}
  >
    <div style="padding:1rem;">
      <strong>Animated Content</strong><br />
      This content will animate!
    </div>
  </my-animator>
`;

export const Default = Template.bind({});
Default.args = {
  animationType: 'fade-in',
  duration: 1000,
  easing: 'ease-out',
  theme: 'light',
};

export const CoolTransition = Template.bind({});
CoolTransition.args = {
  ...Default.args,
  animationType: 'cool',
};

export const SlideIn = Template.bind({});
SlideIn.args = {
  ...Default.args,
  animationType: 'slide-in',
};

export const SlideLeft = Template.bind({});
SlideLeft.args = {
  ...Default.args,
  animationType: 'slide-left',
};

export const ZoomIn = Template.bind({});
ZoomIn.args = {
  ...Default.args,
  animationType: 'zoom-in',
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  ...Default.args,
  theme: 'dark',
};