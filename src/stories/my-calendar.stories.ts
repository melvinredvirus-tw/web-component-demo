import { html } from 'lit';
import '../atoms/my-calendar';

export default {
  title: 'Atoms/MyCalendar',
  component: 'my-calendar',
  parameters: {
    docs: {
      description: {
        component: `
A fully themeable, accessible, and responsive calendar web component built with Lit and your design system variables.

**Features:**
- Uses CSS custom properties for theming (see \`theme.css\`)
- Keyboard accessible and screen reader friendly
- Emits a \`date-selected\` event when a date is picked
- Uses atomic design (icon-element for navigation)
- Responsive and mobile-friendly
- **Month and year selection** via dropdowns in the header

**Usage:**
\`\`\`html
<my-calendar></my-calendar>
\`\`\`

**Set initial date (JS only):**
\`\`\`js
const calendar = document.createElement('my-calendar');
calendar.value = new Date(2025, 6, 7); // July 7, 2025
document.body.appendChild(calendar);
\`\`\`

**Listen for date selection:**
\`\`\`js
document.querySelector('my-calendar').addEventListener('date-selected', (e) => {
  console.log('Selected date:', e.detail.date);
});
\`\`\`

**Theming:**
\`\`\`css
my-calendar {
  --calendar-accent: var(--color-success);
  --calendar-today: var(--color-warning);
}
\`\`\`

**Month/Year selection:**
- Use the dropdowns in the header to jump to any month or year in the range.
- The year range is centered on the current view year (±10 years).
        `,
      },
    },
  },
  argTypes: {
    value: { control: 'date', description: 'Initial selected date (JS only, not attribute)' },
  },
};

interface MyCalendarArgs {
  value?: Date | string | number;
}

const Template = (args: MyCalendarArgs) => {
  // Always pass a Date instance, fallback to today if not provided
  const value = args.value instanceof Date
    ? args.value
    : args.value
      ? new Date(args.value)
      : new Date();
  return html`
    <my-calendar
      .value=${value}
      @date-selected=${(e: CustomEvent) => {
        // eslint-disable-next-line no-console
        console.log('Date selected:', e.detail.date);
      }}
    ></my-calendar>
  `;
};

export const Default = Template.bind({});
Default.args = {
  value: new Date(),
};

export const WithCustomTheme = Template.bind({});
WithCustomTheme.args = {
  value: new Date(),
};
WithCustomTheme.parameters = {
  backgrounds: { default: 'dark' },
  docs: {
    description: {
      story: 'Demonstrates the calendar with a dark theme. Try toggling your app theme or set `data-theme=\'dark\'` on the body.'
    }
  }
};
