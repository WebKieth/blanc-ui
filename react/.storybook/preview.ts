import type { Preview } from "@storybook/react";
import { applyCssReset, applyCssVariables } from '../src/styles'

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

applyCssReset()
applyCssVariables()

export default preview;
