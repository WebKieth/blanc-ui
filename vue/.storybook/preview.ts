import type { Preview } from "@storybook/vue3";
import { setup } from '@storybook/vue3'
import { globals } from '../src/styles/variables.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

setup(() => globals)

export default preview;
