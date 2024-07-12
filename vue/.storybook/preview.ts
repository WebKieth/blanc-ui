import type { Preview } from "@storybook/vue3";
import { setup } from '@storybook/vue3'
import { globals, reset } from '../src/styles/variables.css'

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

setup(() => {
  globals
  reset
})

export default preview;
